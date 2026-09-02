// 森のしごと村：この入口は役目を終えました。古い登録を解除して終了します。
self.addEventListener('install', function(){ self.skipWaiting(); });
self.addEventListener('activate', function(e){
  e.waitUntil(self.registration.unregister().then(function(){ return self.clients.claim(); }));
});
