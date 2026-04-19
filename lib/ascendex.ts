import crypto from "crypto";

const BASE_URL = "https://ascendex.com";

interface AscendExCredentials {
  apiKey: string;
  apiSecret: string;
  accountGroup: string;
}

function sign(secret: string, timestamp: string, apiPath: string): string {
  const prehash = `${timestamp}+${apiPath}`;
  return crypto
    .createHmac("sha256", secret)
    .update(prehash)
    .digest("base64");
}

function authHeaders(
  creds: AscendExCredentials,
  apiPath: string
): Record<string, string> {
  const timestamp = Date.now().toString();
  const signature = sign(creds.apiSecret, timestamp, apiPath);
  return {
    "x-auth-key": creds.apiKey,
    "x-auth-timestamp": timestamp,
    "x-auth-signature": signature,
    "Content-Type": "application/json",
  };
}

// ─── Public (no auth) ────────────────────────────────────────

export async function getContractInfo() {
  const res = await fetch(`${BASE_URL}/api/pro/v2/futures/contract`);
  return res.json();
}

export async function getCollateralInfo() {
  const res = await fetch(`${BASE_URL}/api/pro/v2/futures/collateral`);
  return res.json();
}

export async function getPricingData() {
  const res = await fetch(`${BASE_URL}/api/pro/v2/futures/pricing-data`);
  return res.json();
}

export async function getFuturesTicker(symbol?: string) {
  const url = symbol
    ? `${BASE_URL}/api/pro/v2/futures/ticker?symbol=${symbol}`
    : `${BASE_URL}/api/pro/v2/futures/ticker`;
  const res = await fetch(url);
  return res.json();
}

export async function getBarHist(
  symbol: string,
  interval: string,
  n?: number
) {
  const params = new URLSearchParams({ symbol, interval });
  if (n) params.set("n", n.toString());
  const res = await fetch(`${BASE_URL}/api/pro/v1/barhist?${params}`);
  return res.json();
}

// ─── Private (auth required) ──────────────────────────────────

export async function getAccountInfo(creds: AscendExCredentials) {
  const apiPath = "v2/account/info";
  const headers = authHeaders(creds, apiPath);
  const res = await fetch(`${BASE_URL}/api/pro/v2/account/info`, { headers });
  return res.json();
}

export async function getPosition(creds: AscendExCredentials) {
  const apiPath = "v2/futures/position";
  const headers = authHeaders(creds, apiPath);
  const res = await fetch(
    `${BASE_URL}/${creds.accountGroup}/api/pro/v2/futures/position`,
    { headers }
  );
  return res.json();
}

export async function getFreeMargin(creds: AscendExCredentials) {
  const apiPath = "v2/futures/free-margin";
  const headers = authHeaders(creds, apiPath);
  const res = await fetch(
    `${BASE_URL}/${creds.accountGroup}/api/pro/v2/futures/free-margin`,
    { headers }
  );
  return res.json();
}

// ─── Leverage / Margin ────────────────────────────────────────

export async function changeLeverage(
  creds: AscendExCredentials,
  symbol: string,
  leverage: number
) {
  const apiPath = "v2/futures/leverage";
  const headers = authHeaders(creds, apiPath);
  const res = await fetch(
    `${BASE_URL}/${creds.accountGroup}/api/pro/v2/futures/leverage`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ symbol, leverage }),
    }
  );
  return res.json();
}

export async function changeMarginType(
  creds: AscendExCredentials,
  symbol: string,
  marginType: "isolated" | "crossed"
) {
  const apiPath = "v2/futures/margin-type";
  const headers = authHeaders(creds, apiPath);
  const res = await fetch(
    `${BASE_URL}/${creds.accountGroup}/api/pro/v2/futures/margin-type`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ symbol, marginType }),
    }
  );
  return res.json();
}

// ─── Orders ───────────────────────────────────────────────────

export interface PlaceOrderParams {
  symbol: string;
  orderQty: string;
  orderType: "Limit" | "Market" | "StopLimit" | "StopMarket";
  side: "Buy" | "Sell";
  orderPrice?: string;
  stopPrice?: string;
  timeInForce?: "GTC";
  respInst?: "ACK" | "ACCEPT" | "DONE";
  postOnly?: boolean;
  posStopLossPrice?: string;
  posTakeProfitPrice?: string;
}

export async function placeOrder(
  creds: AscendExCredentials,
  params: PlaceOrderParams
) {
  const apiPath = "v2/futures/order";
  const headers = authHeaders(creds, apiPath);
  const body = {
    ...params,
    time: Date.now(),
    respInst: params.respInst || "ACCEPT",
  };
  const res = await fetch(
    `${BASE_URL}/${creds.accountGroup}/api/pro/v2/futures/order`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    }
  );
  return res.json();
}

export async function placeBatchOrders(
  creds: AscendExCredentials,
  orders: PlaceOrderParams[]
) {
  const apiPath = "v2/futures/order/batch";
  const headers = authHeaders(creds, apiPath);
  const body = {
    orders: orders.map((o) => ({ ...o, time: Date.now() })),
  };
  const res = await fetch(
    `${BASE_URL}/${creds.accountGroup}/api/pro/v2/futures/order/batch`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    }
  );
  return res.json();
}

export async function cancelOrder(
  creds: AscendExCredentials,
  orderId: string,
  symbol: string
) {
  const apiPath = "v2/futures/order";
  const headers = authHeaders(creds, apiPath);
  const res = await fetch(
    `${BASE_URL}/${creds.accountGroup}/api/pro/v2/futures/order`,
    {
      method: "DELETE",
      headers,
      body: JSON.stringify({ orderId, symbol, time: Date.now() }),
    }
  );
  return res.json();
}

export async function cancelAllOrders(
  creds: AscendExCredentials,
  symbol?: string
) {
  const apiPath = "v2/futures/order/all";
  const headers = authHeaders(creds, apiPath);
  const body = symbol ? { symbol } : {};
  const res = await fetch(
    `${BASE_URL}/${creds.accountGroup}/api/pro/v2/futures/order/all`,
    {
      method: "DELETE",
      headers,
      body: JSON.stringify(body),
    }
  );
  return res.json();
}

export async function getOpenOrders(
  creds: AscendExCredentials,
  symbol?: string
) {
  const apiPath = "v2/futures/order/open";
  const headers = authHeaders(creds, apiPath);
  const params = symbol ? `?symbol=${symbol}` : "";
  const res = await fetch(
    `${BASE_URL}/${creds.accountGroup}/api/pro/v2/futures/order/open${params}`,
    { headers }
  );
  return res.json();
}

export async function getOrderStatus(
  creds: AscendExCredentials,
  orderId: string
) {
  const apiPath = "v2/futures/order/status";
  const headers = authHeaders(creds, apiPath);
  const res = await fetch(
    `${BASE_URL}/${creds.accountGroup}/api/pro/v2/futures/order/status?orderId=${orderId}`,
    { headers }
  );
  return res.json();
}

export async function getOrderHistory(
  creds: AscendExCredentials,
  n = 50,
  symbol?: string
) {
  const apiPath = "v2/futures/order/hist/current";
  const headers = authHeaders(creds, apiPath);
  const params = new URLSearchParams({ n: n.toString() });
  if (symbol) params.set("symbol", symbol);
  const res = await fetch(
    `${BASE_URL}/${creds.accountGroup}/api/pro/v2/futures/order/hist/current?${params}`,
    { headers }
  );
  return res.json();
}

// ─── Transfer (deposit/withdraw to futures) ────────────────────

export async function depositToFutures(
  creds: AscendExCredentials,
  asset: string,
  amount: string
) {
  const apiPath = "v2/futures/transfer/deposit";
  const headers = authHeaders(creds, apiPath);
  const res = await fetch(
    `${BASE_URL}/${creds.accountGroup}/api/pro/v2/futures/transfer/deposit`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ asset, amount }),
    }
  );
  return res.json();
}

export async function withdrawFromFutures(
  creds: AscendExCredentials,
  asset: string,
  amount: string
) {
  const apiPath = "v2/futures/transfer/withdraw";
  const headers = authHeaders(creds, apiPath);
  const res = await fetch(
    `${BASE_URL}/${creds.accountGroup}/api/pro/v2/futures/transfer/withdraw`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ asset, amount }),
    }
  );
  return res.json();
}

// ─── Funding ──────────────────────────────────────────────────

export async function getFundingPayments(
  creds: AscendExCredentials,
  page = 1,
  pageSize = 20,
  symbol?: string
) {
  const apiPath = "v2/futures/funding-payments";
  const headers = authHeaders(creds, apiPath);
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });
  if (symbol) params.set("symbol", symbol);
  const res = await fetch(
    `${BASE_URL}/${creds.accountGroup}/api/pro/v2/futures/funding-payments?${params}`,
    { headers }
  );
  return res.json();
}
