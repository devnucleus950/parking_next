interface liveSessionsProps {
  name: string
  startTime: string
  pricePerHour: number
}

export const LiveSessionCard = ({ startTime, pricePerHour, name }: liveSessionsProps) => {

  const getDuration = () => {
    if (!startTime) return 0;
    const start = new Date(startTime)
    const now = new Date();
    return Math.floor((now.getTime() - start.getTime()) / 60000)
  }

  const formatDuration = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`
  }

  const getFare = () => {
    const minutes = getDuration();
    return ((minutes / 60) * pricePerHour).toFixed(2);
  }

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase()
  }

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      {/* USER */}
      <td className="px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm shrink-0">
            {getInitials(name)}
          </div>
          <p className="font-semibold">{name}</p>
        </div>
      </td>

      {/* START TIME */}
      <td className="px-8 py-5 text-gray-500 font-medium">
        {new Date(startTime).toLocaleTimeString("en-IN", {
          hour: "2-digit", minute: "2-digit", hour12: true
        })}
      </td>

      {/* DURATION */}
      <td className="px-8 py-5 font-semibold">
        {formatDuration(getDuration())}
      </td>

      {/* ESTIMATED FARE */}
      <td className="px-8 py-5 font-bold text-primary">
        ₹{getFare()}
      </td>

      {/* STATUS */}
      <td className="px-8 py-5">
        <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-bold rounded-full uppercase tracking-wide">
          In Progress
        </span>
      </td>
    </tr>
  )
}