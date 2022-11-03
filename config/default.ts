// creates variables to use throughout the app when config package is initalized
export default {
  port: 1337,
  dbUri: "mongodb+srv://deliveryadmin:deliveryadmin6721@cluster0.oxtui8m.mongodb.net/?retryWrites=true&w=majority",
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIICXgIBAAKBgQDgmKPgrHdvwNxVQvTha9opu5NngRUS7F8zykjFkRah3r0ZoVkA
7EDbgfKRsYpQJSicR970UBT3dRbFxJ+fre0lbWJ+zCrIIZzpmBH7raTF9SDylCqK
DcUkTfJC2ru/UKaQ1CFpqbmSqCM+aYsgqt5vpkBaD2+/M98T1uhXTS2EHQIDAQAB
AoGAVDAjTbaYVqWecb9Vd6Ir9vS+/k9ejOdZkFpFCPmn2ClcDN10NWpZrW56dK5u
QDiNjndKVZ4nHdMgJCXeB8b0Wx09Gh2YUaa7tWO0dWQeJ0n5mASvyMS932slTXN2
lGDo/2mjU5aNFw71lahOPWsFaMJuTViTWZDltcXqvV/ngUECQQD7Sf+fB0Ue77Va
HnlBwZ90CfGzpPSEPXDUsC6ybAbeefbmjnV06m2lbRgJelHx0ETKMJCmMWBNsNUq
GZNJjqV5AkEA5M6JMagoK73a+4z/fLYeD94wT2GolMcpqC+1/HW80/3JhiuLf4/K
HnH9oXKO+bgHziuCOiecJpGMkJUf5iQexQJBAK35XGWAhgVWFitvX6n74GZZICKs
uLD5TK2j0KCsk9DhheO3i3BHgWP/dJ3TNvqAo6+MEglNtAv1uo8sJ8HMZZkCQQCC
hVL70aoAsc/eWWNQt+7ULHIwhkwNesNHntfYiS1LXOV9tQ9hmBu7XFlLpLbsus8x
C97A3+GSmsqtm3PT69zlAkEAnFgvL1vvtAfaRKo56jn+TOo4Flys2LKl8yl3KbUh
OYtUIP62T1mfcqsQxzEgEMolO5oHS5SDhXMiB5YUN9rBTw==
-----END RSA PRIVATE KEY-----`,
  publicKey: `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDgmKPgrHdvwNxVQvTha9opu5Nn
gRUS7F8zykjFkRah3r0ZoVkA7EDbgfKRsYpQJSicR970UBT3dRbFxJ+fre0lbWJ+
zCrIIZzpmBH7raTF9SDylCqKDcUkTfJC2ru/UKaQ1CFpqbmSqCM+aYsgqt5vpkBa
D2+/M98T1uhXTS2EHQIDAQAB
-----END PUBLIC KEY-----`
}