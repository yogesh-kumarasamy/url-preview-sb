How to create vite + react + ts project?
[`pnpm create vite . --template react-ts`](https://vite.dev/guide/#scaffolding-your-first-vite-project)
The above command will create you a scaffolding project with react and typescript + vite

How did you add tailwind to your project?
[`pnpm install tailwindcss @tailwindcss/vite`](https://tailwindcss.com/docs/installation/using-vite)
downgraded tailwind to version 3
postcss config upgrade
It was not working with new tailwind version

How can we add storybook to a vite project?
[`pnpm create storybook@latest`](https://storybook.js.org/docs/get-started/install) - will scan your project and add all the necessary packages for you!

How did I add EDS packages to the project?
[`pnpm install @adaptavant/eds-brands @adaptavant/eds-core @adaptavant/eds-fonts @adaptavant/eds-translations`](https://earth.anywhere.co/content/getting-started#install-dependencies)

TODO:

- [ ] Add npmrc to download EDS packages to develop on top of EDS components - done
- [ ] Install EDS packages here - done but warning without impact
- [ ] Setup EDS Provider to get the themes in the root - done
- [ ] Add token temporarily somewhere to access the meta api now - done
- [ ] Copy preview component from connect project and make it work - done
- [ ] Add stories to the component - done
- [ ] Add msw to mock the responses for storybook - done
- [ ] Test the component
- [ ] Check with Udhaya on how to utilize full auth for such setup
- [ ] Deploy storybook if possible

- [ ] development - image size fix for all dimensions - done but clarify
- [ ] develpoment - loader state - done
- [ ] development - footer action bar alignment - done
- [ ] footer action bar visibilty handling for all the url's - done
- [ ] footer action bar on click event - done
- [ ] hover title link handling - question to vishal
- [ ] title link handling without hover - done
- [ ] hover title tooltip - done
- [ ] hover title copy functionality - question to vishal as we have copy in the footer section
- [ ] whole component onclick open in new tab - done
- [ ] video play icon overlay - done
- [ ] development - find aspect ratio based on natural image size using a react hook! - done
- [ ] development - based on the ratio decide how many ratio's we need to handle - done
- [ ] development - layout stacking/side by side based on the ratio - lastly
- [ ] hover background color - done
- [ ] textlink hover disable - done
- [ ] cache layer for avoiding duplicate calls - done

- [ ] apply everything to vimeo - done

- [ ] storybook - less content state - done
- [ ] storybook - grouping with examples and states - done

- [ ] Integration tomorrow with baseapp(access token, endpoint logic)
- [ ] Third column link only render, pin message functionality
- [ ] Image preview - don't call url preview component handling

Explore the following later,

- vitest.workspace.ts
- .storybook/vitest.setup.ts
- .storybook/main.ts & preview.ts
- stories directory under src

Logs after adding storybook?
pnpm create storybook@latest
.../Library/pnpm/store/v3/tmp/dlx-43402 | Progress: resolved .../Library/pnpm/store/v3/tmp/dlx-43402 | Progress: resolved .../Library/pnpm/store/v3/tmp/dlx-43402 | Progress: resolved .../Library/pnpm/store/v3/tmp/dlx-43402 | Progress: resolved .../Library/pnpm/store/v3/tmp/dlx-43402 | +8 +
.../Library/pnpm/store/v3/tmp/dlx-43402 | Progress: resolved .../Library/pnpm/store/v3/tmp/dlx-43402 | Progress: resolved 8, reused 7, dow.../Library/pnpm/store/v3/tmp/dlx-43402 | Progress: resolved 8, reused 7, d.../Library/pnpm/store/v3/tmp/dlx-43402 | Progress: resolved 8, reused 7, downloaded 1, added 8, done
╭───────────────────────────────────────────────────────╮
│ │
│ Adding Storybook version 8.6.12 to your project.. │
│ │
╰───────────────────────────────────────────────────────╯
✔ What do you want to use Storybook for? › Documentation: MDX, auto-generated component docs, Testing: Fast browser-based component tests, watch mode
• Detecting project type. ✓
Installing dependencies...

Lockfile is up to date, resolution step is skipped
Already up to date
Done in 359ms
• Adding Storybook support to your "React" app • Detected Vite project. Setting builder to Vite. ✓

✅ Getting the correct version of 8 packages
Configuring eslint-plugin-storybook in your package.json
✅ Installing Storybook dependencies
. ✓
Installing dependencies...

Lockfile is up to date, resolution step is skipped
Already up to date
Done in 398ms

attention => Storybook now collects completely anonymous telemetry regarding usage.
This information is used to shape Storybook's roadmap and prioritize features.
You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
https://storybook.js.org/telemetry

> npx storybook@8.6.12 add @storybook/experimental-addon-test@8.6.12
> Verifying @storybook/experimental-addon-test
> Installing @storybook/experimental-addon-test@^8.6.12
> Adding '@storybook/experimental-addon-test@8.6.12' to the "addons" field in .storybook/main.ts
> Running postinstall script for @storybook/experimental-addon-test

╭ 👋 Howdy! ─────────────────────────────────────────────────────────────────╮
│ │
│ I'm the installation helper for @storybook/experimental-addon-test │
│ │
│ Hold on for a moment while I look at your project and get it set up... │
│ │
╰────────────────────────────────────────────────────────────────────────────╯

╭ 🙈 Let me cover this for you ────────────────────────────────────────────────╮
│ │
│ You don't seem to have a coverage reporter installed. Vitest needs │
│ either V8 or Istanbul to generate coverage reports. │
│ │
│ Adding @vitest/coverage-v8 to enable coverage reporting. │
│ Read more about Vitest coverage providers at │
│ https://vitest.dev/guide/coverage.html#coverage-providers │
│ │
╰──────────────────────────────────────────────────────────────────────────────╯

› Installing dependencies:
vitest@latest, @vitest/browser@latest, playwright, @vitest/coverage-v8@latest

› Configuring Playwright with Chromium (this might take some time):
npx playwright install chromium --with-deps

› Creating a Vitest setup file for Storybook:
/Users/yogesh.kumar/Documents/Try/preview-component/.storybook/vitest.setup.ts

╭ ⚠️ Cannot update config file ────────────────────────────────────────────────╮
│ │
│ Could not update your existing Vite config file: │
│ /Users/yogesh.kumar/Documents/Try/preview-component/vite.config.ts │
│ │
│ Your existing config file cannot be safely updated, so instead a new │
│ Vitest │
│ workspace file will be created, extending from your config file. │
│ │
│ Please refer to the Vitest documentation to learn about the workspace │
│ file: │
│ https://vitest.dev/guide/workspace.html │
│ │
╰──────────────────────────────────────────────────────────────────────────────╯

› Creating a Vitest workspace file:
/Users/yogesh.kumar/Documents/Try/preview-component/vitest.workspace.ts

╭ 🎉 All done! ────────────────────────────────────────────────────────────────╮
│ │
│ The Storybook Test addon is now configured and you're ready to run your │
│ tests! │
│ │
│ Here are a couple of tips to get you started: │
│ • You can run tests with npx vitest --project=storybook │
│ • When using the Vitest extension in your editor, all of your stories │
│ will be shown as tests! │
│ │
│ Check the documentation for more information about its features and │
│ options at: │
│ https://storybook.js.org/docs/writing-tests/test-addon │
│ │
╰──────────────────────────────────────────────────────────────────────────────╯

╭──────────────────────────────────────────────────────────────────────────────╮
│ │
│ Storybook was successfully installed in your project! 🎉 │
│ Additional features: Documentation, Testing │
│ │
│ To run Storybook manually, run pnpm run storybook. CTRL+C to stop. │
│ │
│ Wanna know more about Storybook? Check out https://storybook.js.org/ │
│ Having trouble or want to chat? Join us at https://discord.gg/storybook/

Logs after EDS installation

pnpm install @adaptavant/eds-brands @adaptavant/eds-core @adaptavant/eds-fonts @adaptavant/eds-translations
Packages: +54
++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 530, reused 437, downloaded 30, added 54, done

dependencies:

- @adaptavant/eds-brands 1.4.1
- @adaptavant/eds-core 1.20.0
- @adaptavant/eds-fonts 1.0.0
- @adaptavant/eds-translations 1.2.0

WARN  Issues with peer dependencies found
.
└─┬ @adaptavant/eds-core 1.20.0
├── ✕ unmet peer react@^18.2.0: found 19.1.0
├── ✕ unmet peer react-dom@^18.2.0: found 19.1.0
├── ✕ unmet peer tailwindcss@^3.3.5: found 4.1.4
└─┬ react-day-picker 8.10.1
└── ✕ unmet peer react@"^16.8.0 || ^17.0.0 || ^18.0.0": found 19.1.0

Done in 6.1s
