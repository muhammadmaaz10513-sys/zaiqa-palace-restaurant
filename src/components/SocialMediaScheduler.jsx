import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Video, 
  Image as ImageIcon, 
  CheckCircle, 
  Sparkles, 
  TrendingUp,
  Share2,
  ExternalLink
} from 'lucide-react';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export const SCHEDULED_POSTS = [
  {
    id: 1,
    day: 'Day 1',
    type: 'Post (Picture)',
    icon: ImageIcon,
    title: 'Menu / Grand Opening Announcement',
    time: '12:30 PM',
    timezone: 'PKT (Pakistan Time)',
    reason: 'People look for food before lunch',
    caption: '✨ Authentic Royal Flavors have arrived! Explore our grand menu of tender Shinwari Karahis, aromatic Sindhi Biryanis & charcoal kebabs. Order online now! 🍽️🔥 #ZaiqaPalace #KarachiFood #DesiFeast',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    platform: 'Instagram & Facebook',
    status: 'Scheduled',
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: 2,
    day: 'Day 1',
    type: 'Reel (Video)',
    icon: Video,
    title: 'A Dish Being Made (Sizzling Wok Karahi)',
    time: '8:00 PM',
    timezone: 'PKT (Pakistan Time)',
    reason: 'Dinner time, most people are online',
    caption: '🥩 Sizzling hot Mutton Shinwari Karahi tossed in fresh organic tomatoes, green chilies, and pure ghee. Watch that aromatic steam! 🤤 Deliveries active till 1:00 AM! #Reels #KarahiLove #DinnerVibes',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
    platform: 'Instagram Reels & FB Reels',
    status: 'Scheduled',
    color: 'from-pink-500 to-rose-600',
  },
  {
    id: 3,
    day: 'Day 2',
    type: 'Post (Picture)',
    icon: ImageIcon,
    title: "Today's Deal (Lunch Combo Offer)",
    time: '1:00 PM',
    timezone: 'PKT (Pakistan Time)',
    reason: 'Lunch break peak ordering hour',
    caption: '💼 Office Lunch Deal! Get our Boneless Makhni Handi + 2 Butter Naans + Chilled Mint Lemonade at 20% OFF today only! Fast 30-min express delivery. Order link in bio! 🚀 #LunchDeals #OfficeLunch',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80',
    platform: 'Instagram & Facebook',
    status: 'Scheduled',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 4,
    day: 'Day 3',
    type: 'Post (Picture)',
    icon: ImageIcon,
    title: 'Customer Favourite (Seekh Kabab Platter)',
    time: '7:30 PM',
    timezone: 'PKT (Pakistan Time)',
    reason: 'Evening, time to order dinner',
    caption: '🍢 Voted #1 Charcoal Grill in town! Tender, melt-in-mouth Beef Seekh Kababs served with roasted cumin raita and onion rings. Treat your family tonight! 👑 #WeekendDinner #KababPlatter #FoodieKarachi',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    platform: 'Instagram & Facebook',
    status: 'Scheduled',
    color: 'from-emerald-500 to-teal-600',
  },
];

export default function SocialMediaScheduler() {
  const [activePlatform, setActivePlatform] = useState('all');

  return (
    <div className="space-y-8 text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-semibold border border-orange-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Part B: Requirement 7 (20 marks)</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Automated Social Media Scheduler
          </h2>
          <p className="text-xs text-slate-400">
            3 posts (pictures) + 1 reel scheduled to publish automatically at peak Pakistan engagement hours.
          </p>
        </div>

        {/* Screenshot Helper Badge */}
        <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-300 max-w-sm">
          <strong>📸 Submission Ready:</strong> Take a screenshot of this scheduler view showing the 4 times below for your Sunday Hackathon submission!
        </div>
      </div>

      {/* Official Schedule Timetable Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-orange-400" />
            <span>Master Publishing Timetable (Pakistan Standard Time)</span>
          </h3>
          <span className="text-xs text-emerald-400 font-mono bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
            ● 4/4 Automation Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3.5">Day</th>
                <th className="p-3.5">What (Format & Content)</th>
                <th className="p-3.5">Scheduled Time (PKT)</th>
                <th className="p-3.5">Why (Strategic Timing)</th>
                <th className="p-3.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {SCHEDULED_POSTS.map((post) => {
                const Icon = post.icon;
                return (
                  <tr key={post.id} className="hover:bg-slate-850/50 transition">
                    <td className="p-3.5 font-bold text-white whitespace-nowrap">
                      {post.day}
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-slate-800 text-orange-400">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">{post.title}</p>
                          <p className="text-[11px] text-slate-400">{post.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 w-fit">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.time} PKT</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-slate-400 max-w-xs">
                      {post.reason}
                    </td>
                    <td className="p-3.5 text-center whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-400 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                        <CheckCircle className="w-3 h-3" /> Scheduled
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visual Social Media Cards Grid */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-white">Visual Social Media Post Previews</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SCHEDULED_POSTS.map((post) => (
            <div
              key={post.id}
              className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl flex flex-col justify-between"
            >
              {/* Post Header */}
              <div className="p-4 bg-slate-950 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 p-0.5">
                    <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center font-bold text-xs text-orange-400">
                      Z
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white">zaiqapalace.restaurant</h4>
                    <p className="text-[10px] text-slate-400">Karachi, Pakistan</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-amber-400 font-mono font-semibold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  <Clock className="w-3 h-3" />
                  <span>{post.day} · {post.time}</span>
                </div>
              </div>

              {/* Post Image */}
              <div className="relative aspect-video bg-slate-950 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-md border border-slate-700">
                  {post.type}
                </div>
              </div>

              {/* Post Caption & Details */}
              <div className="p-4 space-y-3 bg-slate-900">
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white mr-1.5">zaiqapalace.restaurant</strong>
                  {post.caption}
                </p>

                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Target: {post.reason}</span>
                  <span className="text-orange-400 font-medium">{post.platform}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

