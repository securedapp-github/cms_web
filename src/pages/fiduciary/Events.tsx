import { Calendar, MapPin, Users, Clock } from 'lucide-react';

const Events = () => {
  const events = [
    {
      id: 1,
      title: 'Annual General Meeting 2025',
      date: '2025-12-15',
      time: '10:00 AM',
      location: 'Conference Hall A',
      attendees: 45,
      status: 'upcoming',
    },
    {
      id: 2,
      title: 'Consent Workshop',
      date: '2025-11-25',
      time: '2:00 PM',
      location: 'Virtual',
      attendees: 120,
      status: 'upcoming',
    },
    {
      id: 3,
      title: 'DPDP Act Compliance Training',
      date: '2025-11-20',
      time: '11:00 AM',
      location: 'Training Room 3',
      attendees: 30,
      status: 'completed',
    },
    {
      id: 4,
      title: 'Data Privacy Summit',
      date: '2025-11-18',
      time: '9:00 AM',
      location: 'Main Auditorium',
      attendees: 200,
      status: 'completed',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Events</h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage and track all your consent management events.
            </p>
          </div>
          <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm">
            Create Event
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-blue-200"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.status === 'upcoming'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-gray-50 text-gray-700 border border-gray-200'
                  }`}
                >
                  {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span>{new Date(event.date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>{event.time}</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span>{event.location}</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span>{event.attendees} attendees</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex gap-3">
                <button className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 font-medium text-sm">
                  View Details
                </button>
                {event.status === 'upcoming' && (
                  <button className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium text-sm">
                    Edit Event
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
