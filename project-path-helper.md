# Project Path Helper

If you are seeing errors like `npm ERR! enoent Could not read package.json`, it is likely because you are running commands in the wrong directory.

The `package.json` file for this project is located inside the `dsa-portal` folder, not in the root directory.

## How to Fix

1. **Navigate to the correct folder:**
   Open your terminal and run the following command to move into the project directory:

   ```bash
   cd dsa-portal
   ```

   If you are in the root folder `/Users/aaradhychinche/Documents/Fnatics project/Fnatics-project-`, the full path to your project is:
   `/Users/aaradhychinche/Documents/Fnatics project/Fnatics-project-/dsa-portal`

2. **Verify you are in the right place:**
   Run the list command to check if `package.json` is present:

   ```bash
   ls
   ```
   You should see `package.json` in the output.

3. **Run your commands:**
   Now you can safely run your npm commands:

   ```bash
   npm run dev
   ```
