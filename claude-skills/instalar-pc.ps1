# Instala y sincroniza los skills de Oscar en Claude Code (Windows).
# Uso (en PowerShell):
#   powershell -ExecutionPolicy Bypass -File instalar-pc.ps1             -> instala/actualiza ahora
#   powershell -ExecutionPolicy Bypass -File instalar-pc.ps1 -Programar  -> además lo programa a diario (09:00 y al iniciar sesión)
param([switch]$Programar)
$ErrorActionPreference = "Stop"

$RepoUrl = "https://github.com/vincentimo-18/hub.git"
$Rama    = if ($env:SKILLS_RAMA) { $env:SKILLS_RAMA } else { "claude/optimistic-franklin-s8ppeh" }
$Clon    = Join-Path $HOME ".claude-skills-repo"
$Destino = Join-Path $HOME ".claude\skills"

if (Test-Path (Join-Path $Clon ".git")) {
  git -C $Clon fetch --quiet origin $Rama
  git -C $Clon checkout --quiet -B $Rama "origin/$Rama"
} else {
  git clone --quiet --branch $Rama $RepoUrl $Clon
}

New-Item -ItemType Directory -Force -Path $Destino | Out-Null
Get-ChildItem (Join-Path $Clon "claude-skills\skills") -Directory | ForEach-Object {
  $dst = Join-Path $Destino $_.Name
  if (Test-Path $dst) { Remove-Item $dst -Recurse -Force }
  Copy-Item $_.FullName $dst -Recurse
  Write-Host "OK  $($_.Name)"
}
Write-Host "Skills al dia en $Destino ($(Get-Date -Format 'yyyy-MM-dd HH:mm'))"

if ($Programar) {
  $copia = Join-Path $HOME ".claude-skills-sync.ps1"
  Copy-Item $PSCommandPath $copia -Force
  $accion  = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$copia`""
  $diario  = New-ScheduledTaskTrigger -Daily -At 9am
  $inicio  = New-ScheduledTaskTrigger -AtLogOn
  $ajustes = New-ScheduledTaskSettingsSet -StartWhenAvailable
  Register-ScheduledTask -TaskName "Claude skills sync" -Action $accion -Trigger $diario,$inicio -Settings $ajustes -Force | Out-Null
  Write-Host "Programado: cada dia a las 09:00 y al iniciar sesion (si el PC estaba apagado, se ejecuta al encenderlo)."
}
