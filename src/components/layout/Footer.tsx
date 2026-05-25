/** Site footer — update name and GitHub URL for your portfolio */
export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-6">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
        Built by{' '}
        <span className="font-medium text-slate-700">Chris</span>
        {' · '}
        <a
          href="https://github.com/cyangster/helpdesk"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
        >
          GitHub
        </a>
      </div>
    </footer>
  )
}
