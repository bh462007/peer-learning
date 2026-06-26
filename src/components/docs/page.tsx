import { motion } from "framer-motion";
import { ChevronDown, Sparkles, Shield, GitBranch, Users } from "lucide-react";
import { useState } from "react";

const docsSections = [
  {
    id: 0,
    icon: <Shield className="h-6 w-6" />,
    title: "Code of Conduct",
    category: "Community",
    content: `
## Our Pledge
We are committed to creating a welcoming, respectful, and inclusive environment for everyone participating in this project.

## Expected Behavior
- Be respectful and supportive
- Use inclusive and professional language
- Accept constructive feedback gracefully
- Collaborate positively with others

## Unacceptable Behavior
- Harassment or discrimination
- Offensive or abusive language
- Personal attacks or trolling
- Sharing private information without permission

## Enforcement
Violations may result in warnings, temporary restrictions, or permanent removal from the community.
    `,
  },
  {
    id: 1,
    icon: <GitBranch className="h-6 w-6" />,
    title: "Contributing Guidelines",
    category: "Development",
    content: `
## How to Contribute

### 1. Forking the Repository
1. Click the **Fork** button at the top right.
2. Clone your fork:
   \`\`\`bash
   git clone https://github.com/<your-username>/peer-learning.git
   \`\`\`
3. Add upstream remote:
   \`\`\`bash
   git remote add upstream https://github.com/durdana3105/peer-learning.git
   \`\`\`

### 2. Creating Branches
Always work on a new branch:
\`\`\`bash
git checkout -b feature/your-feature-name
\`\`\`

### 3. Making Commits
- Use clear, imperative commit messages
- Keep changes focused

### 4. Coding Standards
- Write clean, readable code
- Follow existing project structure
- Add comments for complex logic
- Write/update tests

### 5. Submitting Pull Requests
1. Push your branch
2. Open a PR against the \`main\` branch
3. Provide clear description and reference any issues

---

Thank you for contributing to PeerLearn!
    `,
  },
  {
    id: 2,
    icon: <Users className="h-6 w-6" />,
    title: "Full Contributing Guide",
    category: "Development",
    content: `
Thank you for your interest in contributing to the Peer Learning project!

### Quick Steps
1. Fork the repository
2. Clone your fork locally
3. Create a new branch
4. Make your changes
5. Commit with meaningful messages
6. Push and create a Pull Request

### Contribution Rules
- Write clean and readable code
- Follow the existing project structure
- Test your changes before submitting
- Keep pull requests focused and small
- Be respectful and professional

### Reporting Issues
- Open an issue with clear description
- Include steps to reproduce (if applicable)
    `,
  },
];

export default function Docs() {
  const [openSection, setOpenSection] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#071127] to-[#020B1F] text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative mx-auto max-w-5xl px-6 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
            <Sparkles className="h-10 w-10 text-cyan-400" />
          </div>
          <h1 className="text-6xl font-black tracking-tighter">
            Documentation
          </h1>
          <p className="mt-4 text-xl text-slate-400">
            Guidelines and resources for contributors
          </p>
        </motion.div>

        {/* Docs Accordion */}
        <div className="mx-auto max-w-4xl space-y-6">
          {docsSections.map((section, i) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-3xl border border-white/12 bg-white/7 shadow-[0_12px_40px_rgba(2,6,23,0.28)] backdrop-blur-3xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenSection(openSection === section.id ? null : section.id)
                }
                className={`flex w-full items-center justify-between px-8 py-6 text-left transition-all duration-300 ${
                  openSection === section.id
                    ? "bg-cyan-400/10"
                    : "hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-400">
                    {section.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold">{section.title}</h2>
                    <p className="text-sm text-slate-400">{section.category}</p>
                  </div>
                </div>

                <motion.div
                  animate={{ rotate: openSection === section.id ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <ChevronDown className="h-6 w-6 text-slate-400" />
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openSection === section.id ? "auto" : 0,
                  opacity: openSection === section.id ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="border-t border-white/10 px-8 pb-10 pt-6 text-slate-200/90 prose prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed bg-black/30 p-6 rounded-2xl overflow-x-auto">
                    {section.content.trim()}
                  </pre>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-20 text-center text-slate-500">
          <p>
            Need help?{" "}
            <a href="/contact" className="text-cyan-400 hover:underline">
              Contact us
            </a>{" "}
            or open an issue on GitHub.
          </p>
        </div>
      </div>
    </div>
  );
}
