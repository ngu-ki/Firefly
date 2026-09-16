export async function onRequestGet(context) {
  const clientId = context.env.GITHUB_CLIENT_ID;
  const url = new URL(context.request.url);
  const redirectUri = `${url.origin}/api/auth/callback`;
  const scope = 'repo'; // 需要 repo 权限才能写仓库

  const githubAuthUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${scope}`;

  return Response.redirect(githubAuthUrl, 302);
}