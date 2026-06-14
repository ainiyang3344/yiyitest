const express = require('express');
const path = require('path');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Retrieve the local IP address for LAN access
function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  const addresses = [];

  for (const interfaceName in interfaces) {
    const addressesForInterface = interfaces[interfaceName];
    for (const addressInfo of addressesForInterface) {
      // Look for IPv4 addresses that are not internal loopbacks (127.0.0.1)
      if (addressInfo.family === 'IPv4' && !addressInfo.internal) {
        // Filter out common virtual adapters if possible to avoid confusion,
        // but generally listing all valid LAN IPs is helpful.
        addresses.push(addressInfo.address);
      }
    }
  }
  return addresses.length > 0 ? addresses : ['localhost'];
}

app.listen(PORT, '0.0.0.0', () => {
  const localIps = getLocalIpAddress();
  console.log('\n================================================================');
  console.log('🎉 局域网动态错题库服务已成功启动！');
  console.log(`💻 在电脑本机上访问:   http://localhost:${PORT}`);
  console.log('📱 在局域网内的手机、iPad 或其他电脑上访问：');
  localIps.forEach(ip => {
    console.log(`   👉  http://${ip}:${PORT}`);
  });
  console.log('================================================================\n');
});
