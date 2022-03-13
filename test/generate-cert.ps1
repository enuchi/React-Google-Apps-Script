# reference code: https://stackoverflow.com/questions/70226493/webpack-dev-server-and-https-this-site-can-t-be-reached
# reference issue: https://github.com/FiloSottile/mkcert/issues/286

$dnsName = "localhost"
$expiry = [DateTime]::Now.AddYears(1);
$repoRoot = Split-Path $PSScriptRoot
$certsDir = "$repoRoot\certs";
$fileName = "cert.pfx";
$passwordText = "abc123";
$name = "ReactApp";

Write-Host "Creating cert directly into CurrentUser\My store"

$certificate = New-SelfSignedCertificate `
    -KeyExportPolicy 'Exportable' `
    -CertStoreLocation Cert:\CurrentUser\My `
    -Subject $name `
    -FriendlyName $name `
    -DnsName $dnsName `
    -NotAfter $expiry

$certFile = Join-Path $certsDir $fileName

Write-Host "Exporting certificate to $certFile"

$password = ConvertTo-SecureString `
    -String $passwordText `
    -Force -AsPlainText

Export-PfxCertificate `
    -Cert $certificate `
    -FilePath $certFile `
    -Password $password | Out-Null

Write-Host "Importing $certFile to CurrentUser\Root store for immediate system wide trust"

Import-PfxCertificate `
    -FilePath $certFile `
    -CertStoreLocation Cert:\LocalMachine\Root `
    -Password $password | Out-Null