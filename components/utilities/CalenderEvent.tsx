export const CalenderEvent = () => {
    return <div className="text-[8px] flex items-center gap-2 italic">
        {/* Marker */}
        <div className="w-2.5 h-2.5 bg-background rounded-full border-2 border-green-500" />

        {/* Event */}
        <button className="w-full text-left">
            Event -- Employee one Joined the show
        </button>
    </div>
}