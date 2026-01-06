interface Breach {
  Name: string
  Title: string
  Domain: string
  BreachDate: string
  AddedDate: string
  ModifiedDate: string
  PwnCount: number
  Description: string
  LogoPath: string
  DataClasses: string[]
  IsVerified: boolean
  IsFabricated: boolean
  IsSensitive: boolean
  IsRetired: boolean
  IsSpamList: boolean
  IsMalware: boolean
  IsSubscriptionFree: boolean
}

interface BreachResultsProps {
  breaches: Breach[]
  email: string
}

export function BreachResults({ breaches, email }: BreachResultsProps) {
  if (breaches.length === 0) {
    return (
      <div className="mt-8 rounded-2xl bg-green-50 p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="mt-4 font-display text-2xl font-semibold text-slate-900">
          Good News!
        </h3>
        <p className="mt-2 text-slate-700">
          <span className="font-semibold">{email}</span> has not been found in
          any known data breaches.
        </p>
        <p className="mt-4 text-sm text-slate-600">
          However, continue to practice good security habits and monitor your
          accounts regularly.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <div className="rounded-2xl bg-red-50 p-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <svg
            className="h-8 w-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="mt-4 font-display text-2xl font-semibold text-slate-900">
          Breaches Found
        </h3>
        <p className="mt-2 text-slate-700">
          <span className="font-semibold">{email}</span> was found in{' '}
          <span className="font-semibold text-red-600">
            {breaches.length} data breach{breaches.length !== 1 ? 'es' : ''}
          </span>
        </p>
        <p className="mt-2 text-sm text-slate-600">
          We recommend changing your passwords immediately and enabling
          two-factor authentication.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {breaches.map((breach) => (
          <div
            key={breach.Name}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-display text-xl font-semibold text-slate-900">
                  {breach.Title}
                </h4>
                {breach.Domain && (
                  <p className="mt-1 text-sm text-slate-600">{breach.Domain}</p>
                )}
              </div>
              {breach.IsVerified && (
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                  Verified
                </span>
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-slate-900">Breach Date</p>
                <p className="text-slate-600">
                  {new Date(breach.BreachDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Affected Accounts</p>
                <p className="text-slate-600">
                  {breach.PwnCount.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="font-semibold text-slate-900">Compromised Data</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {breach.DataClasses.map((dataClass) => (
                  <span
                    key={dataClass}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                  >
                    {dataClass}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="mt-4 text-sm text-slate-600"
              dangerouslySetInnerHTML={{ __html: breach.Description }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
