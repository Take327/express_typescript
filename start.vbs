Dim WinScriptHost
Set WinScriptHost = CreateObject("WScript.Shell")
WinScriptHost.Run Chr(34) & "C:\work\express_typescript\main.bat" & Chr(34), 0
Set WinScriptHost = Nothing