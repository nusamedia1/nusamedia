import { datadogRum } from '@datadog/browser-rum';

// Pastikan kode ini hanya berjalan di sisi browser (klien), bukan saat build di server
if (typeof window !== 'undefined') {
  datadogRum.init({
    applicationId: 'ISI_DENGAN_APPLICATION_ID_DATADOG_ANDA',
    clientToken: 'ISI_DENGAN_CLIENT_TOKEN_DATADOG_ANDA',
    site: 'datadoghq.com', // atau 'datadoghq.eu' tergantung region akun Anda
    service: 'nusa-media',
    env: 'production', // bisa diganti dev / production
    version: '1.0.0',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
  });
}
