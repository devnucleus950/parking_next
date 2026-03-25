interface subscriberProps {
  name: string
  subscribedAt: string
}

export const SubscriberCard = ({ name, subscribedAt }: subscriberProps) => {
  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase()
  }

  return (
    <div className="bg-[#f2f4f5] p-5 rounded-xl flex items-center justify-between hover:bg-white hover:shadow-sm transition-all duration-200">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
          {getInitials(name)}
        </div>
        <div>
          <p className="font-bold">{name}</p>
          <p className="text-xs text-gray-500">
            Subscribed {new Date(subscribedAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short"
            })}
          </p>
        </div>
      </div>
      <div className="text-right space-y-1">
        <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-bold rounded-full uppercase tracking-wide">
          Active
        </span>
      </div>
    </div>
  )
}