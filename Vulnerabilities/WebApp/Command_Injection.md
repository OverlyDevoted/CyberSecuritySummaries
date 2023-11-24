## Command Injection

Attackers may input CLI commands through inputs and execute any command or download files into the server to execute any actions.

For example, the WordPress Plugin Plainview Activity Monitor 20161228 has a vulnerability that allows attackers to inject their command in the ip value, by simply adding | COMMAND... after the ip value.
