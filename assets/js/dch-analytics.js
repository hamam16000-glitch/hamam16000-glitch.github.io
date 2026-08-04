(function () {
  "use strict";

  var config = window.DCH_ANALYTICS_CONFIG || {};
  var measurementId = String(config.googleAnalyticsMeasurementId || "").trim().toUpperCase();
  var validMeasurementId = /^G-[A-Z0-9]+$/.test(measurementId);
  var hostname = window.location.hostname;
  var isLocal = window.location.protocol === "file:" || hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
  var enabled = validMeasurementId && (!isLocal || config.allowLocalhost === true);

  var status = {
    provider: "Google Analytics 4",
    enabled: enabled,
    configured: validMeasurementId,
    localEnvironment: isLocal,
    measurementId: validMeasurementId ? measurementId : null,
    reason: enabled ? "active" : (validMeasurementId && isLocal ? "disabled-on-localhost" : "measurement-id-not-configured")
  };

  window.DCHAnalytics = Object.freeze({
    status: function () {
      return Object.assign({}, status);
    }
  });

  if (!enabled) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    send_page_view: true,
    transport_type: "beacon"
  });

  var script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
  script.referrerPolicy = "strict-origin-when-cross-origin";
  script.onerror = function () {
    status.enabled = false;
    status.reason = "google-tag-load-failed";
  };
  document.head.appendChild(script);
}());
