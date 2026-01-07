import './index.css';
// 1. The Core Provider (Essential for colors)
export { GrimoireProvider } from './provider/GrimoireProvider';

// 2. The Toast System
export { ToastProvider, useToast } from './components/ToastProvider';

// 3. UI Components
export { default as Button } from './components/Button';
export { default as Input } from './components/Input';
export { default as TextArea } from './components/Textarea';
export { default as PasswordInput } from './components/PasswordInput';
export { default as Badge } from './components/Badge';
export { default as Avatar } from './components/Avatar';
export { default as Spinner } from './components/Spinner';
export { default as FileUpload } from './components/FileUpload';
export { default as ProgressBar } from './components/ProgressBar';
export { default as Tooltip } from './components/Tooltip';

// 4. Selection Controls
export { default as Checkbox } from './components/Checkbox';
export { default as RadioGroup } from './components/RadioGroup';
export { default as ToggleSwitch } from './components/ToggleSwitch';
export { default as SingleSelectDropdown } from './components/SingleSelectDropdown';
export { default as MultiSelectDropdown } from './components/MultiSelectDropdown';

// 5. Layout & Feedback
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/Card';
export { default as Tabs } from './components/Tabs';
export { default as ConfirmDialog } from './components/ConfirmDialog';