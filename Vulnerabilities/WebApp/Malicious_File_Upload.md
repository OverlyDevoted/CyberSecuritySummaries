## Malicious file upload

Another common vulnerability that can lead to attacker gaining access control. If files are not validated, attackers could upload scripts  (e.g. `PHP`) run cli commands directly on the server.

Validation alone does not solve all problems. Sometimes validations can be bypassed.

For example, the WordPress Plugin Responsive Thumbnail Slider 1.0 can be exploited to upload any arbitrary file, including malicious scripts, by uploading a file with a double extension (i.e. shell.php.jpg). There's even a Metasploit Module that allows us to exploit this vulnerability easily.

