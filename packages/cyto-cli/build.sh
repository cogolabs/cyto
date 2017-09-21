npm run transpile

chmod 755 build/index.js

# Add shebang to the top of the output
echo "#!/usr/bin/env node
$(cat build/index.js)" > build/index.js
