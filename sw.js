// 森のしごと村 サービスワーカー：PWAインストール要件＋Web Push通知の受け取り。
self.addEventListener('install', function(){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function(){ /* パススルー */ });

// 通知の受信 → 端末に表示
self.addEventListener('push', function(event){
  var data = {};
  try { data = event.data ? event.data.json() : {}; } catch(e){ data = { body: (event.data && event.data.text) ? event.data.text() : '' }; }
  var title = data.title || '森のしごと村';
  var options = {
    body: data.body || '',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    data: { url: data.url || './' },
    tag: data.tag || 'mura',
    renotify: true
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// 通知タップ → アプリを開く（すでに開いていればそれを前面に）
self.addEventListener('notificationclick', function(event){
  event.notification.close();
  var url = (event.notification.data && event.notification.data.url) || './';
  event.waitUntil(
    self.clients.matchAll({ type:'window', includeUncontrolled:true }).then(function(list){
      for (var i=0;i<list.length;i++){ if ('focus' in list[i]) return list[i].focus(); }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    })
  );
});
