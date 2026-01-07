import { useState } from 'react'
import { Mail, Save, AlertCircle, Trash2, CheckCircle, Clock, ShieldAlert, Bell, User, Settings, Lock, Search, MoreVertical } from 'lucide-react'

// 1. The Grimoire Provider (To apply your theme)
import { GrimoireProvider } from './provider/GrimoireProvider'

// 2. Import custom elements (Paths updated to ./components)
import Button from './components/Button'
import Input from './components/Input'
// Note: Ensure you have these files. If you kept "TextArea" naming from our previous step, update naming here.
import PasswordInput from './components/PasswordInput'
import Textarea from './components/Textarea' 
import Badge from './components/Badge'
import Avatar from './components/Avatar'
import SingleSelectDropdown from './components/SingleSelectDropdown'
import MultiSelectDropdown from './components/MultiSelectDropdown'
import ConfirmDialog from './components/ConfirmDialog'
import Checkbox from './components/Checkbox'
import ToggleSwitch from './components/ToggleSwitch'
import RadioGroup from './components/RadioGroup'
import FileUpload from './components/FileUpload'
import Spinner from './components/Spinner'
import Tabs from './components/Tabs'
import ProgressBar from './components/ProgressBar'
import Tooltip from './components/Tooltip'
import { useToast } from './components/ToastProvider' // Ensure this exists

// Import Card Components
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/Card'

function App() {
  // Use optional chaining just in case ToastProvider isn't set up perfectly yet
  const toast = useToast ? useToast() : { addToast: console.log };
  const addToast = toast.addToast;

  // --- States ---
  const [activeTab, setActiveTab] = useState('account');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [textInput, setTextInput] = useState('')
  const [bio, setBio] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [singleSelection, setSingleSelection] = useState('')
  const [multiSelection, setMultiSelection] = useState([])
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [enableNotifs, setEnableNotifs] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState('free')
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // --- Config ---
  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'security', label: 'Security', icon: Lock, count: 2 },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell, count: 12 },
  ]

  const frameworkOptions = [
    { label: 'React.js', value: 'react' },
    { label: 'Vue.js', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Next.js', value: 'next' },
  ]

  const planOptions = [
    { label: 'Free Tier', value: 'free' },
    { label: 'Pro Plan ($20/mo)', value: 'pro' },
    { label: 'Enterprise (Custom)', value: 'ent', disabled: true },
  ]

  // --- Handlers ---
  const triggerError = () => {
    setErrorMsg("This is a temporary error message!");
    addToast("Validation failed. Please check the form.", "error", { position: 'top-left' }); 
  }

  const handleDelete = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsDeleteDialogOpen(false);
      addToast("User deleted successfully", "success");
    }, 2000);
  }

  const handleSave = () => {
    setIsSaveDialogOpen(false);
    addToast("Settings saved to database", "success");
  }

  const handleInfoToast = () => {
    addToast("This is a standard info message.", "info");
  }

  return (
    // 3. Wrapped in Provider with YOUR defaults
        <div className="w-full max-w-7xl mx-auto p-6 pb-32 min-h-screen bg-slate-50">
        <h1 className="text-4xl font-bold text-center mb-12 text-primary">Grimoire Design System</h1>

        {/* SECTION 1: CARDS & LAYOUT */}
        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 pb-2 border-b text-gray-700">1. Cards & Containers</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
            
            {/* Variant A: Simple Card */}
            <Card>
                <CardHeader>
                <CardTitle>Simple Card</CardTitle>
                <CardDescription>Just a basic container.</CardDescription>
                </CardHeader>
                <CardContent>
                <p className="text-gray-600 text-sm">
                    This is the standard card used for grouping content. It has a header, body, and shadow.
                </p>
                </CardContent>
            </Card>

            {/* Variant B: With Footer & Actions */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>Interactive Card</CardTitle>
                        <CardDescription>With footer actions.</CardDescription>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={20}/></button>
                    </div>
                </CardHeader>
                <CardContent>
                <div className="h-20 bg-gray-50 rounded border border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-sm">
                    Content Placeholder
                </div>
                </CardContent>
                <CardFooter className="justify-end gap-2">
                <Button variant="ghost" text="Cancel"/>
                <Button text="Save" />
                </CardFooter>
            </Card>

            {/* Variant C: Image / Media Card */}
            <Card className="overflow-hidden">
                <div className="h-32 bg-linear-to-r from-secondary to-primary relative">
                    <div className="absolute -bottom-6 left-6">
                        <Avatar size="lg" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80" className="border-4 border-white" />
                    </div>
                </div>
                <div className="mt-8 px-6 pb-6">
                    <CardTitle>Profile Card</CardTitle>
                    <CardDescription>Senior Developer</CardDescription>
                    <p className="text-sm text-gray-600 mt-4">
                    Passionate about building design systems and clean UI components.
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                        <Badge text="React" variant="primary" />
                        <Badge text="Design" variant="warning" />
                    </div>
                </div>
            </Card>
            </div>
        </section>

        {/* SECTION 2: NAVIGATION */}
        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 pb-2 border-b text-gray-700">2. Navigation</h2>
            <Card>
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="bg-gray-50 px-6 pt-2" />
            <CardContent className="h-32 flex items-center justify-center text-gray-500 bg-white">
                <p>Active Content: <span className="font-bold text-primary capitalize">{activeTab}</span></p>
            </CardContent>
            </Card>
        </section>

        <div className="grid lg:grid-cols-2 gap-12">
            
            {/* SECTION 3: FORM CONTROLS */}
            <section className="space-y-8">
            <h2 className="text-2xl font-semibold mb-6 pb-2 border-b text-gray-700">3. Form Controls</h2>
            <Card>
                <CardContent className="space-y-5">
                <Input 
                    label="Standard Input" 
                    placeholder="Enter text..." 
                    value={textInput} 
                    onChange={(e) => setTextInput(e.target.value)} 
                />

                <Input 
                    label="Input with Icon & Error" 
                    icon={<Mail size={18}/>}
                    type="email"
                    placeholder="john@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    error={errorMsg}
                />

                <PasswordInput 
                    label="Password Input" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />

                <Textarea 
                    label="Textarea"
                    placeholder="Tell us about yourself..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                />

                <FileUpload 
                    label="File Upload (Drag & Drop)"
                    accept="image/*"
                    maxSizeMB={2}
                    value={selectedFile}
                    onChange={setSelectedFile}
                    error={errorMsg}
                />
                </CardContent>
            </Card>
            </section>

            {/* SECTION 4: SELECTION CONTROLS */}
            <section className="space-y-8">
            <h2 className="text-2xl font-semibold mb-6 pb-2 border-b text-gray-700">4. Selection Controls</h2>
            <Card>
                <CardContent className="space-y-6">
                <SingleSelectDropdown 
                    label="Single Select"
                    placeholder="Choose framework..."
                    options={frameworkOptions}
                    value={singleSelection}
                    onChange={setSingleSelection}
                />

                <MultiSelectDropdown 
                    label="Multi Select"
                    placeholder="Select multiple..."
                    options={frameworkOptions}
                    value={multiSelection}
                    onChange={setMultiSelection}
                />

                <div className="grid grid-cols-2 gap-6 pt-4">
                    <RadioGroup 
                        label="Radio Group"
                        options={planOptions}
                        value={selectedPlan}
                        onChange={setSelectedPlan}
                    />

                    <div className="space-y-4">
                        <label className="block font-medium text-gray-700 mb-2">Toggles & Checks</label>
                        <Checkbox 
                            label="Checkbox with Description"
                            description="This is a supporting text."
                            checked={agreeTerms}
                            onChange={setAgreeTerms}
                        />
                        
                        <div className="h-4"></div>

                        <ToggleSwitch 
                            label="Toggle Switch"
                            checked={enableNotifs}
                            onChange={setEnableNotifs}
                        />
                    </div>
                </div>
                </CardContent>
            </Card>
            </section>
        </div>

        {/* SECTION 5: DATA DISPLAY */}
        <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-6 pb-2 border-b text-gray-700">5. Data Display</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Badges & Avatars</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div>
                            <label className="block mb-3 font-medium text-gray-700">Status Badges</label>
                            <div className="flex flex-wrap gap-3">
                                <Tooltip content="Primary Status"><Badge text="Primary" variant="primary" /></Tooltip>
                                <Tooltip content="Operation Successful"><Badge text="Active" variant="success" icon={CheckCircle} /></Tooltip>
                                <Tooltip content="Action Required"><Badge text="Pending" variant="warning" icon={Clock} /></Tooltip>
                                <Tooltip content="Critical Error"><Badge text="Failed" variant="danger" icon={ShieldAlert} /></Tooltip>
                                <Badge text="Archived" variant="neutral" />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-3 font-medium text-gray-700">Avatars</label>
                            <div className="flex flex-wrap items-end gap-4">
                                <Avatar size="lg" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80" />
                                <Avatar size="md" fallback="JD" variant="rounded" className="bg-indigo-100 text-indigo-600" />
                                <Avatar size="md" src="broken.jpg" fallback="ER" className="bg-rose-100 text-rose-600" />
                                <Avatar size="sm" variant="square" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80" />
                                <Avatar size="sm" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Progress Indicators</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <ProgressBar progress={35} label="Setup Completion" showPercentage size="sm" />
                        <ProgressBar progress={62} label="Storage Usage" showPercentage variant="warning" />
                        <ProgressBar progress={92} label="Critical Level" variant="danger" size="lg" />
                        <ProgressBar progress={100} label="Upload Complete" variant="success" size="md" />
                    </CardContent>
                </Card>
            </div>
        </section>

        {/* SECTION 6: ACTIONS & FEEDBACK */}
        <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-6 pb-2 border-b text-gray-700">6. Actions & Feedback</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader><CardTitle>Buttons & Tooltips</CardTitle></CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap items-center gap-4">
                            <Button text="Primary" onClick={() => {}} />
                            <Button variant="secondary" text="Secondary" icon={<Save size={18}/>} />
                            <Button variant="outline" text="Outline" icon={<Search size={18}/>} />
                            <Button variant="ghost" text="Ghost" />
                            
                            <div className="h-8 w-px bg-gray-300 mx-2"></div>

                            <Tooltip content="I am a disabled button" position="top">
                                <Button text="Disabled" disabled />
                            </Tooltip>
                            <Tooltip content="Loading State" position="right">
                                <Button disabled icon={<Spinner size="sm" variant="white" />} />
                            </Tooltip>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Triggers</CardTitle></CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-3">
                            <Button text="Confirm Dialog" icon={<CheckCircle size={18}/>} onClick={() => setIsSaveDialogOpen(true)} />
                            
                            <Button variant="outline" text="Destructive Dialog" icon={<Trash2 size={18}/>} className="border-red-200 text-red-600 hover:bg-red-800 hover:border-red-300" onClick={() => setIsDeleteDialogOpen(true)} />
                            
                            <Button variant="secondary" text="Trigger Toast" icon={<Bell size={18}/>} onClick={handleInfoToast} />
                            
                            <Button variant="ghost" text="Trigger Error" onClick={triggerError} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>

        {/* --- Dialogs --- */}
        <ConfirmDialog
            isOpen={isSaveDialogOpen}
            onClose={() => setIsSaveDialogOpen(false)}
            onConfirm={handleSave}
            title="Save Changes?"
            description="Are you sure you want to save these changes? This will update the public record."
            confirmText="Yes, Save"
            variant="primary"
        />

        <ConfirmDialog
            isOpen={isDeleteDialogOpen}
            onClose={() => !isProcessing && setIsDeleteDialogOpen(false)}
            onConfirm={handleDelete}
            title="Delete User?"
            description="This action is permanent and cannot be undone. Are you absolutely sure?"
            confirmText="Delete Immediately"
            variant="danger"
            isLoading={isProcessing} 
        />
        </div>
  )
}

export default App