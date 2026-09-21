import fs from 'fs';

const configPath = 'c:\\Users\\abhij\\.gemini\\config\\mcp_config.json';
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

async function testDataForSEO() {
  const d = config.mcpServers?.dataforseo?.env;
  if (!d || d.DATAFORSEO_USERNAME === 'YOUR_DATAFORSEO_LOGIN') {
    return { service: 'DataForSEO', status: 'SKIPPED', message: 'Placeholder keys present. Replace with real login/password.' };
  }
  try {
    const auth = Buffer.from(`${d.DATAFORSEO_USERNAME}:${d.DATAFORSEO_PASSWORD}`).toString('base64');
    const res = await fetch('https://api.dataforseo.com/v3/appendix/user_data', {
      headers: { 'Authorization': `Basic ${auth}` }
    });
    const json = await res.json();
    if (res.ok && json.status_code === 20000) {
      const moneyObj = json.tasks?.[0]?.result?.[0]?.money;
      const balance = typeof moneyObj === 'object' ? moneyObj.balance : moneyObj;
      return { service: 'DataForSEO', status: 'SUCCESS ✅', balance: `$${Number(balance).toFixed(2)}`, message: 'Authenticated successfully!' };
    } else {
      return { service: 'DataForSEO', status: 'FAILED ❌', error: json.status_message || res.statusText };
    }
  } catch (err) {
    return { service: 'DataForSEO', status: 'ERROR ❌', error: err.message };
  }
}

async function testGitHub() {
  const g = config.mcpServers?.github?.env;
  if (!g || g.GITHUB_PERSONAL_ACCESS_TOKEN === 'YOUR_GITHUB_PERSONAL_ACCESS_TOKEN') {
    return { service: 'GitHub', status: 'SKIPPED', message: 'Placeholder token present.' };
  }
  try {
    const res = await fetch('https://api.github.com/user', {
      headers: { 
        'Authorization': `token ${g.GITHUB_PERSONAL_ACCESS_TOKEN}`,
        'User-Agent': 'Teeli-App-Tester'
      }
    });
    const json = await res.json();
    if (res.ok) {
      return { service: 'GitHub', status: 'SUCCESS ✅', user: json.login, message: `Connected as @${json.login}` };
    } else {
      return { service: 'GitHub', status: 'FAILED ❌', error: json.message };
    }
  } catch (err) {
    return { service: 'GitHub', status: 'ERROR ❌', error: err.message };
  }
}

async function testVercel() {
  const v = config.mcpServers?.vercel?.env;
  if (!v || v.VERCEL_TOKEN === 'YOUR_VERCEL_TOKEN') {
    return { service: 'Vercel', status: 'SKIPPED', message: 'Placeholder token present.' };
  }
  try {
    const res = await fetch('https://api.vercel.com/v9/projects', {
      headers: { 'Authorization': `Bearer ${v.VERCEL_TOKEN}` }
    });
    const json = await res.json();
    if (res.ok && json.projects) {
      const projNames = json.projects.map(p => p.name).join(', ');
      return { service: 'Vercel', status: 'SUCCESS ✅', user: projNames, message: `Connected to project(s): ${projNames}` };
    } else {
      return { service: 'Vercel', status: 'FAILED ❌', error: json.error?.message || res.statusText };
    }
  } catch (err) {
    return { service: 'Vercel', status: 'ERROR ❌', error: err.message };
  }
}

async function testNotion() {
  const n = config.mcpServers?.notion?.env;
  let token = null;
  if (n?.OPENAPI_MCP_HEADERS) {
    try {
      const parsed = JSON.parse(n.OPENAPI_MCP_HEADERS);
      const match = parsed.Authorization?.match(/Bearer\s+(.*)/);
      if (match) token = match[1];
    } catch {}
  } else if (n?.NOTION_API_KEY && n.NOTION_API_KEY !== 'YOUR_NOTION_API_KEY') {
    token = n.NOTION_API_KEY;
  }
  if (!token) {
    return { service: 'Notion', status: 'SKIPPED', message: 'Placeholder key present.' };
  }
  try {
    const res = await fetch('https://api.notion.com/v1/users/me', {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Notion-Version': '2022-06-28'
      }
    });
    const json = await res.json();
    if (res.ok) {
      return { service: 'Notion', status: 'SUCCESS ✅', user: json.name, message: `Connected as ${json.name} (${json.bot?.workspace_name})` };
    } else {
      return { service: 'Notion', status: 'FAILED ❌', error: json.message };
    }
  } catch (err) {
    return { service: 'Notion', status: 'ERROR ❌', error: err.message };
  }
}

async function testSentry() {
  const s = config.mcpServers?.sentry?.env;
  if (!s || s.SENTRY_AUTH_TOKEN === 'YOUR_SENTRY_AUTH_TOKEN') {
    return { service: 'Sentry', status: 'SKIPPED', message: 'Placeholder token present.' };
  }
  try {
    const res = await fetch('https://sentry.io/api/0/users/me/', {
      headers: { 'Authorization': `Bearer ${s.SENTRY_AUTH_TOKEN}` }
    });
    const json = await res.json();
    if (res.ok) {
      return { service: 'Sentry', status: 'SUCCESS ✅', user: json.email, message: 'Connected successfully!' };
    } else {
      return { service: 'Sentry', status: 'FAILED ❌', error: json.detail || res.statusText };
    }
  } catch (err) {
    return { service: 'Sentry', status: 'ERROR ❌', error: err.message };
  }
}

async function runAll() {
  console.log('Testing MCP Credentials...\n');
  const results = [
    await testDataForSEO(),
    await testGitHub(),
    await testVercel(),
    await testNotion(),
    await testSentry()
  ];
  console.table(results);
}

runAll();
