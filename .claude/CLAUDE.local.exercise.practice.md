# Exercise Practice Guidelines

- The file is not!!!!! complete until I have submitted it online. For that it needs to be uploaded to gitea in the main branch. I also want it to be in v0.N.N until it passes their test without errors  Then I can submit it. I keep on saying this. Remember this! Stop marking exercises as complete until I have tested them. When they pass update them to v1.0.0 with commit messages that give clear,thourough, concise, useful and educational information.
- For exercises that haven't passed online testing yet:
  - Version should always be v0.a.b-XXXXX (where a and b can be any number, but first digit must be 0)
  - Example: v0.1.0-tell-me-vip, v0.2.3-tell-me-vip, etc.
  - After the exercise passes online testing:
  - Version becomes v1.0.0-XXXXX (indicating it's complete and verified)
  - Example: v1.0.0-tell-me-vip
  - Work in the feature branch until ready to merge for testing or final submission
- Install the command `rg` so `ripgrep` is available which is a fast `grep` written in rust