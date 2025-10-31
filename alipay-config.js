// 支付宝当面付配置
const ALIPAY_CONFIG = {
    // 应用ID
    appId: '2021003143628959',
    
    // 支付宝网关
    gatewayUrl: 'https://openapi.alipay.com/gateway.do',
    
    // 应用私钥（用于签名）
    privateKey: `MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDEwAXY6qB4EdjwmD9mniBGI/m4g5ZxhP7n3F2UGAVRNbe9DSCb3A15NHHMzqE08Mg72DtrXnb73xgqz+uuFimApmI0YY/RoooBij+ecSmsTFt1diGTNm6yLlU6WoxufiiNKS0mTMtxrTFOtmw2ADwyf1xB2SDCcucZcgZ5O+oNq8DPASUJKCW3gNB8tYz3jv8aCBYK9eGh2lqpm1br8pTKHgb/oCbJln0zY6ue6jrdcP+aCkAgG9TKKHwsSm5UpShbfwv9w6hfr2YdFQGeqOcNt1JLVA6m90oMXGUebhr8J+iDI2xgM/Rchv3uUIQNkLF0geS3ZsZ7AY38Wa8T5osLAgMBAAECggEAG1NH/J5pdwOTi6a5d3kSpmssrZGo/U8pT+5tGLpVUrgRMrJ2Cu9+94xvGbDA9udSB+26IulVwRl08804wE7XqMRy8y9xl/3pCNm4iDrTPNjGAwRLGXT/3sNMlvQoeNgQrbpASQd1Ye5Z4MK5OK7DrYe+um57fEYVDpWljITjts4bS09AJJJTwRoMXyvpforGv+erCLlUS6HxpBdRRz+dfdSO7MqFFxIecO7mIw307FlyrPGcE+pMtfhutjuh9UglYoR1MlvrORRaMrkFQFSYyodo/qYkuCx4ejGBTzmJjifjzHi5BFlAHFheik7lm+e27xSN5BYr59H/m42iDyU0oQKBgQDysfGerI4K6HrUHwpYdpk8oI2m33+1qHuJcxxscHHdFE9Lynahsz3IdkDEIwnsOn98RcieQAiI1N/ljHtK4Ze+J9ZXlr4EzG/Dkf6VoKVE0u4ON3s9ZGtZCls8j6bBuEt8qssF5+ydsYVhgYlcxdRlrCkqJAxCmjBNv8kiQRUamQKBgQDPiUXhCz/P5d3zGzpYmrcr+6HXDhaSb+Kid404tlENSLwXQNJjzEkjWw1xPqwM3rpqAUcPWpSLdVX0/s7aEmjcX5iDKNU34cmVaBCg8WsMZotKUdw11Bd7l7Ce1XZ+V+bxCcaOCmmGxjfsygCWoqgial1tNkF7xznINXEsN89dQwKBgQDR/RdDpKfuVkLYwNbRviROadjGl0FH67SgNAJW7WAH2ufVeyP0O0Ns7KyTSIHwbJkb7MFt85eu1Qm48zlGjDUgahWyiZJ2UnEttWejDXGSQDOMB4NRlk6vpx9UIjM2EID4KEssHAUGWLBAsrUomV9ybWjctn4JLqI204dzZP6emQKBgEHYYtRg1lEmtEGifOOJyt3oi1OJA75YQ0aaubKpnZOiZRLXnSjOstHF3MD2Sm4W6HwjhaEocwLAKpJ9mbF0r9Jjfib2+JcvSt7dUpFNp1Ia4sykpkJp1T2ARihOv7acOwh0uotsYEjDcRDukjs4xjGNH7E7ypD0B7AuzIZj+qWzAoGAX35GiRUfcZQMm4AkuDNzGjq1kefNPryM72tbFt2ExG3hprj4u28O9MPrhUYQ/JU/WUSKvYu1Upfi+AxX+mn16GJHKiaLMWZhFNYoVQNgefaO5ilAzAVrGH9Kn8zYLL0qZoRqcunSysCdtPA58vOUhKwbgIYDMwzEX8AezM6T3OU=`,
    
    // 支付宝公钥（用于验签）
    alipayPublicKey: `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0QYNVMSBsHy1dndWnBuOTv1fR5pAvOC1BoWnjnzbL+1L/14GHM6jVfgGPlDUpXdI73/GHM7VkwWIjLIoP9Fx+4do3xXgqLiZEn+kqfoqrgIejNiwNzRYyfDFAtLPV4iLolhhTCOYglS3sOpPtdKm3bmh+Hs72s/yqR0Z9QoLfSwaUyLxgmrMgRYyA/jAKIcmJqW5OPjKPK7XwJl5IGfJowBGlipaKHHNVtWC0ti8xqVkH/SsOQ4uijUIbIocloYJfgO0QQ2r169UeGrwNdC28RHSnvXTW9lqFjkcw9c2rmpt6SDczD/bSZ7OS36ixJJf/GKAm0SlpksUvOx5NCGYhwIDAQAB`,
    
    // 字符集
    charset: 'utf-8',
    
    // 签名类型
    signType: 'RSA2',
    
    // 版本
    version: '1.0',
    
    // 格式
    format: 'JSON'
};

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ALIPAY_CONFIG;
}
