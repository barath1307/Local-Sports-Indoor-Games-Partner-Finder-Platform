const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.cluster1.nptnhve.mongodb.net",
  (err, records) => {
    if (err) {
      console.error("DNS Error:", err);
    } else {
      console.log("Records:", records);
    }
  }
);