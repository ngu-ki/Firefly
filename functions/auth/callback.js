export async function onRequestGet(context) {
  const { env } = context;
  const url = new URL(context.request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('Missing code', { status: 400 });
  }

  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (tokenData.error) {
    return new Response(JSON.stringify(tokenData), { status: 500 });
  }

  // 将 access token 放回 /admin/ 的 URL 参数中，交给 Decap 保存
  const redirect = new URL('/admin/', url.origin);
  redirect.searchParams.set('token', tokenData.access_token);

  return Response.redirect(redirect.toString(), 302);
}