# bower-helpers
Collection of helper scripts for bower which could not be found anywhere

##bower-install-latest
This command will upgrade all dependencies to the latest released versions regardless of its declared semver.
The reason for its existence is that there is no such tool exist. I personally find that relying on non-exact version is a risk to a stable and repeatable build.
Not everyone follows the exact semantics of semver and it has happened that api changes occurred within a pached version.

So this tool is useful for those who are skeptical with would like to stick with the exact version for every release.
However, it is required that you list all dependencies of dependencies too.
I will convert my bash script to do so to nodejs once I have a chance.
