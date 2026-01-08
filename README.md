# 🧙‍♂️ @shazam-codes/grimoire

**Grimoire** is a modern, opinionated React component library focused on **clean UI**, **strong defaults**, and **easy customization** — without fighting CSS.

It is built with:

* React
* Tailwind CSS (precompiled)
* Lucide Icons
* Context-first theming

> Think of Grimoire as a *spellbook* of ready-to-use UI components for dashboards, admin panels, and SaaS apps.

---

## ✨ Features

* 🎨 **Themeable** via `GrimoireProvider`
* 🧩 **Composable components** (Card, Tabs, Dialogs)
* ⚡ **Fully controlled inputs**
* 🔔 Built-in **Toast system**
* 🧠 Smart defaults with easy overrides
* 🧵 Tailwind-powered with class merging via `cn()`

---

## 📦 Installation
```bash
npm install @shazam-codes/grimoire
```

or
```bash
yarn add @shazam-codes/grimoire
```

---

## 🏗️ Global Setup (Required)

### 1️⃣ Import Styles

Grimoire ships with **precompiled Tailwind styles**.
```js
import "@shazam-codes/grimoire/style.css";
```

> ⚠️ **Important**
> Remove generic element resets from your own `index.css` (e.g. `button`, `input`, `h1`) as they may override Grimoire styles.

---

### 2️⃣ Wrap Your App with Providers
```jsx
import { GrimoireProvider, ToastProvider } from '@shazam-codes/grimoire'

createRoot(document.getElementById('root')).render(
  <GrimoireProvider
    theme={{
      primary: '#18333E',
      secondary: '#1987C6',
      background: "#FFFFFF",
    }}
  >
    <ToastProvider
      defaultPosition="top-right"
      defaultDuration={5000}
    >
      <App />
    </ToastProvider>
  </GrimoireProvider>
)
```

### Providers Explained

| Provider           | Required | Purpose              |
| ------------------ | -------- | -------------------- |
| `GrimoireProvider` | ✅        | Injects theme colors |
| `ToastProvider`    | ❌        | Enables `useToast()` |

---

## 🔔 Toast System

Trigger notifications from anywhere:
```jsx
import { useToast } from '@shazam-codes/grimoire'

const { addToast } = useToast()

addToast('Saved successfully!', 'success')
```

### Toast Types

* `success`
* `error`
* `info`
* `warning`

### Options
```js
addToast(message, type, {
  duration: 5000,
  position: 'top-left'
})
```

---

## 🧩 Component Overview

Every component:

* Is **controlled**
* Accepts `className`
* Uses `cn()` internally for safe overrides

---

## 🔘 Actions & Controls

### Button
```jsx
<Button
  text="Save"
  icon={<Save size={18} />}
  onClick={handleSave}
/>
```

**Variants**

* `primary` (default)
* `secondary`
* `outline`
* `ghost`

**Props**

* `text`
* `icon`
* `onClick`
* `type`
* `disabled`
* `tooltip`
* `className`

---

### ToggleSwitch
```jsx
<ToggleSwitch
  label="Enable notifications"
  checked={enabled}
  onChange={setEnabled}
/>
```

---

### RadioGroup
```jsx
<RadioGroup
  label="Plan"
  options={[
    { label: 'Free', value: 'free' },
    { label: 'Pro', value: 'pro' },
  ]}
  value={plan}
  onChange={setPlan}
/>
```

---

## 📝 Forms & Inputs

### Input
```jsx
<Input
  label="Email"
  icon={<Mail size={18} />}
  value={email}
  onChange={e => setEmail(e.target.value)}
  error="Invalid email"
/>
```

---

### PasswordInput
```jsx
<PasswordInput
  label="Password"
  value={password}
  onChange={e => setPassword(e.target.value)}
/>
```

---

### Textarea
```jsx
<Textarea
  label="Bio"
  rows={3}
  value={bio}
  onChange={e => setBio(e.target.value)}
/>
```

---

### FileUpload
```jsx
<FileUpload
  label="Upload avatar"
  accept="image/*"
  maxSizeMB={2}
  value={file}
  onChange={setFile}
/>
```

✔ Drag & drop
✔ Size validation
✔ Auto-dismiss errors

---

### Checkbox
```jsx
<Checkbox
  label="Accept terms"
  description="You must accept before continuing"
  checked={checked}
  onChange={setChecked}
/>
```

---

## 🔽 Selection & Navigation

### SingleSelectDropdown
```jsx
<SingleSelectDropdown
  label="Framework"
  options={options}
  value={value}
  onChange={setValue}
/>
```

---

### MultiSelectDropdown
```jsx
<MultiSelectDropdown
  label="Technologies"
  options={options}
  value={values}
  onChange={setValues}
/>
```

---

### Tabs
```jsx
<Tabs
  tabs={[
    { id: 'account', label: 'Account', icon: User },
    { id: 'security', label: 'Security', count: 2 },
  ]}
  activeTab={tab}
  onChange={setTab}
/>
```

---

## 📊 Data Display

### Avatar
```jsx
<Avatar
  size="md"
  variant="rounded"
  src="/user.jpg"
  fallback="JD"
/>
```

**Sizes**

* `sm` `md` `lg` `xl`

**Variants**

* `circle`
* `square`
* `rounded`

---

### Badge
```jsx
<Badge text="Active" variant="success" icon={CheckCircle} />
```

**Variants**

* `primary`
* `neutral`
* `success`
* `warning`
* `danger`

---

### Tooltip
```jsx
<Tooltip content="More info">
  <Button text="Hover me" />
</Tooltip>
```

Positions: `top | bottom | left | right`

---

### Spinner
```jsx
<Spinner size="sm" variant="primary" />
```

---

### ProgressBar
```jsx
<ProgressBar
  progress={75}
  label="Upload"
  showPercentage
  variant="warning"
/>
```

---

## 🧱 Layout Components

### Card System
```jsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>

  <CardContent>
    Content here
  </CardContent>

  <CardFooter>
    <Button text="Save" />
  </CardFooter>
</Card>
```

---

## ⚠️ Modals & Feedback

### ConfirmDialog
```jsx
<ConfirmDialog
  isOpen={open}
  onClose={() => setOpen(false)}
  onConfirm={handleConfirm}
  title="Delete item?"
  description="This action is permanent."
  confirmText="Delete"
  variant="danger"
  isLoading={loading}
/>
```

---

## 🎨 Styling & Overrides (`cn()`)

All components merge classes safely:
```jsx
<Button className="px-10 bg-black text-white" />
```

Your styles **override defaults cleanly** — no CSS battles.

---

## 🧠 Design Philosophy

* Controlled components only
* No magic state
* Minimal props, strong defaults
* Easy to extend, hard to break

---

## 🚀 Roadmap (Optional)

* Dark mode support
* Table component
* Date picker
* Command palette

---

## 📄 License

MIT © Shazam Codes