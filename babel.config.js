module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env",
          blocklist: null,
          allowlist: [
            "PUBLIC_SUPABASE_URL",
            "PUBLIC_SUPABASE_ANON_KEY",
            "SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID",
            "SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_SECRET",
            "LOCAL_SUPABASE_URL",
            "LOCAL_SUPABASE_ANON_KEY",
            "SUPABASE_SERVICE_KEY",
            "RESEND_API_KEY",
          ],
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
    ]
  };
};
