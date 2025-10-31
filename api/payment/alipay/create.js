// Vercel Serverless Function - 创建支付宝订单
const AlipaySdk = require('alipay-sdk').default;

// 支付宝配置
const ALIPAY_CONFIG = {
    appId: '2021003143628959',
    privateKey: `MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDEwAXY6qB4EdjwmD9mniBGI/m4g5ZxhP7n3F2UGAVRNbe9DSCb3A15NHHMzqE08Mg72DtrXnb73xgqz+uuFimApmI0YY/RoooBij+ecSmsTFt1diGTNm6yLlU6WoxufiiNKS0mTMtxrTFOtmw2ADwyf1xB2SDCcucZcgZ5O+oNq8DPASUJKCW3gNB8tYz3jv8aCBYK9eGh2lqpm1br8pTKHgb/oCbJln0zY6ue6jrdcP+aCkAgG9TKKHwsSm5UpShbfwv9w6hfr2YdFQGeqOcNt1JLVA6m90oMXGUebhr8J+iDI2xgM/Rchv3uUIQNkLF0geS3ZsZ7AY38Wa8T5osLAgMBAAECggEAG1NH/J5pdwOTi6a5d3kSpmssrZGo/U8pT+5tGLpVUrgRMrJ2Cu9+94xvGbDA9udSB+26IulVwRl08804wE7XqMRy8y9xl/3pCNm4iDrTPNjGAwRLGXT/3sNMlvQoeNgQrbpASQd1Ye5Z4MK5OK7DrYe+um57fEYVDpWljITjts4bS09AJJJTwRoMXyvpforGv+erCLlUS6HxpBdRRz+dfdSO7MqFFxIecO7mIw307FlyrPGcE+pMtfhutjuh9UglYoR1MlvrORRaMrkFQFSYyodo/qYkuCx4ejGBTzmJjifjzHi5BFlAHFheik7lm+e27xSN5BYr59H/m42iDyU0oQKBgQDysfGerI4K6HrUHwpYdpk8oI2m33+1qHuJcxxscHHdFE9Lynahsz3IdkDEIwnsOn98RcieQAiI1N/ljHtK4Ze+J9ZXlr4EzG/Dkf6VoKVE0u4ON3s9ZGtZCls8j6bBuEt8qssF5+ydsYVhgYlcxdRlrCkqJAxCmjBNv8kiQRUamQKBgQDPiUXhCz/P5d3zGzpYmrcr+6HXDhaSb+Kid404tlENSLwXQNJjzEkjWw1xPqwM3rpqAUcPWpSLdVX0/s7aEmjcX5iDKNU34cmVaBCg8WsMZotKUdw11Bd7l7Ce1XZ+V+bxCcaOCmmGxjfsygCWoqgial1tNkF7xznINXEsN89dQwKBgQDR/RdDpKfuVkLYwNbRviROadjGl0FH67SgNAJW7WAH2ufVeyP0O0Ns7KyTSIHwbJkb7MFt85eu1Qm48zlGjDUgahWyiZJ2UnEttWejDXGSQDOMB4NRlk6vpx9UIjM2EID4KEssHAUGWLBAsrUomV9ybWjctn4JLqI204dzZP6emQKBgEHYYtRg1lEmtEGifOOJyt3oi1OJA75YQ0aaubKpnZOiZRLXnSjOstHF3MD2Sm4W6HwjhaEocwLAKpJ9mbF0r9Jjfib2+JcvSt7dUpFNp1Ia4sykpkJp1T2ARihOv7acOwh0uotsYEjDcRDukjs4xjGNH7E7ypD0B7AuzIZj+qWzAoGAX35GiRUfcZQMm4AkuDNzGjq1kefNPryM72tbFt2ExG3hprj4u28O9MPrhUYQ/JU/WUSKvYu1Upfi+AxX+mn16GJHKiaLMWZhFNYoVQNgefaO5ilAzAVrGH9Kn8zYLL0qZoRqcunSysCdtPA58vOUhKwbgIYDMwzEX8AezM6T3OU=`,
    alipayPublicKey: `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0QYNVMSBsHy1dndWnBuOTv1fR5pAvOC1BoWnjnzbL+1L/14GHM6jVfgGPlDUpXdI73/GHM7VkwWIjLIoP9Fx+4do3xXgqLiZEn+kqfoqrgIejNiwNzRYyfDFAtLPV4iLolhhTCOYglS3sOpPtdKm3bmh+Hs72s/yqR0Z9QoLfSwaUyLxgmrMgRYyA/jAKIcmJqW5OPjKPK7XwJl5IGfJowBGlipaKHHNVtWC0ti8xqVkH/SsOQ4uijUIbIocloYJfgO0QQ2r169UeGrwNdC28RHSnvXTW9lqFjkcw9c2rmpt6SDczD/bSZ7OS36ixJJf/GKAm0SlpksUvOx5NCGYhwIDAQAB`,
    gateway: 'https://openapi.alipay.com/gateway.do',
    charset: 'utf-8',
    signType: 'RSA2',
    version: '1.0'
};

// 初始化支付宝SDK
const alipaySdk = new AlipaySdk({
    appId: ALIPAY_CONFIG.appId,
    privateKey: ALIPAY_CONFIG.privateKey,
    alipayPublicKey: ALIPAY_CONFIG.alipayPublicKey,
    gateway: ALIPAY_CONFIG.gateway,
    charset: ALIPAY_CONFIG.charset,
    signType: ALIPAY_CONFIG.signType
});

module.exports = async (req, res) => {
    // 设置 CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { reportId, amount, subject = '商业诊断报告' } = req.body;

        // 生成订单号
        const outTradeNo = 'RPT' + Date.now() + Math.random().toString(36).substr(2, 9);

        console.log('创建支付宝订单:', { outTradeNo, amount, subject });

        // 调用支付宝接口
        const result = await alipaySdk.exec(
            'alipay.trade.precreate',
            {
                notifyUrl: 'https://tianfu.095016.xyz/api/payment/alipay/notify',
                bizContent: {
                    out_trade_no: outTradeNo,
                    product_code: 'FACE_TO_FACE_PAYMENT',
                    total_amount: amount,
                    subject: subject,
                    body: `报告编号: ${reportId}`,
                    timeout_express: '30m'
                }
            }
        );

        console.log('支付宝返回:', result);

        let qrCode = null;

        if (typeof result === 'object' && result !== null) {
            if (result.code === '10000') {
                qrCode = result.qrCode;
            } else {
                throw new Error(`支付宝返回错误: ${result.msg}`);
            }
        }

        if (!qrCode) {
            throw new Error('未能获取二维码');
        }

        res.status(200).json({
            success: true,
            outTradeNo: outTradeNo,
            qrCode: qrCode,
            amount: amount
        });

    } catch (error) {
        console.error('创建支付宝订单失败:', error);
        res.status(500).json({
            success: false,
            error: '创建订单失败',
            message: error.message
        });
    }
};
