# Public Vulnerabilities 

Most critical vulnerabilities are those that can be accessed externally and can be leveraged to take control over the backend server without needing local access to that server. 

Testing for external vulnerabilities is called *external penetration testing*.

## Public CVE

Many companies use proprietary web applications or open-source libraries and as they use, test them they uncover vulnerabilities, which then are recorded, then patched and then shared publicly and assigned a CVE (*Common vulnerabilities and exposures*) record and score.

So searching for public exploits should be the first thing we do when testing web apps for vulnerabilities.

Some security specialists make proof of concept exploits to test certain public vulnerabilities for public use or educational purposes. 

We can get a version of some Web app version, then we can search in google for public exploits. 

[Exploit DB](https://www.exploit-db.com/) (more popular)
[Rapid 7](https://www.rapid7.com/db/) (Most popular)
[Exploit DB](https://www.vulnerability-lab.com/) (is less popular)

Usually we look for vulnerabilities of score 8-10 that lead to **Remote code execution**.
Other types of public exploits should also be considered if none of the above is available.

Vulnerabilities should be searched for not only in the web app, but also in the components (e.g. third-party plugins) utilized in the web app. 

## Common Vulnerability Scoring System (CVSS)

Open standard for assessing severity of an vulnerability. Standard measurements for organizations and governments that help to produce accurate and consistent severity scores.

Scores are based on a formula that uses several metrics:
- Base,
- Temporal,
- Environmental

**Base** produces scores from 0 to 10 and modified by applying Temporal and Environmental metrics.  National Vulnerability Database (NVD) provides scores for almos all know, publicly disclosed vulnerabilities. NVD provides only Base scores. 
Current scoring systems in place are CVSS v2 and CVSS v3.

CVSSv2
| Severity | Base score range |
| - | - |
| Low | 0.0-3.9 |
| Medium | 4.0-6.9 |
| High | 7.0-10.0 |

CVSSv3
| Severity | Base score range |
| - | - |
| None | 0.0 |
| Low | 0.1-3.9 |
| Medium | 4.0-6.9 |
| High | 7.0-8.9 |
| Critical | 9.0-10.0 |

There are [CVSSv2](https://nvd.nist.gov/vuln-metrics/cvss/v2-calculator) and [CVSSv3](https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator) calculators that let organizations that can factor in Temporal and Environmental risks.
[Guide for understanding CVSS metrics](https://www.first.org/cvss/user-guide)

## Backend vulnerabilities

As security specialists we have to consider backend component vulnerabilities.

The most critical vulnerabilities for backend components are found in web servers, as they are publicly accessible over `TCP`. 
```An example of a well-known web server vulnerability is the Shell-Shock, which affected Apache web servers released during and before 2014 and utilized HTTP requests to gain remote control over the back-end server.```