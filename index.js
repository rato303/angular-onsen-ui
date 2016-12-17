var app = ons.bootstrap('MyApp', [
  'onsen',
  'ngCookies',
  'pascalprecht.translate'
]);

app.config([
  '$translateProvider',
  function($translateProvider) {

    $translateProvider.useStaticFilesLoader({
      prefix: 'assets/i18n/locale-',
      suffix: '.json'
    });

    $translateProvider
      .useSanitizeValueStrategy('escape')  // リソースのサニタイズ
      .preferredLanguage('ja')             // デフォルトの言語キーを指定
      .fallbackLanguage('en')              // 選択言語にリソースが見つからない場合の言語
      // .useMissingTranslationHandlerLog()  // キーに対応するリソースが見つからない場合にconsoleに出力
      .useLocalStorage();                 // 選択言語の保存先としてlocalStorageを指定(非対応ブラウザではCookieに保存される)

  }
]);
