// 最小のサービスワーカー（PWAインストール要件用）。中身はネットワーク素通し。
self.addEventListener('install', function(){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function(){ /* パススルー */ });
