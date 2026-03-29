import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppSelector';
import { markAllRead, markRead, clearAll, AppNotification } from '../../modules/notifications/notificationsSlice';
import { BellOff, AlertTriangle, UserCheck, Activity, Info, Trash2, CheckCheck } from 'lucide-react';

interface Props {
  onClose: () => void;
}

const iconMap: Record<AppNotification['type'], React.ReactNode> = {
  critical: <AlertTriangle className="w-4 h-4 text-red-500" />,
  admitted: <UserCheck className="w-4 h-4 text-blue-500" />,
  status:   <Activity className="w-4 h-4 text-amber-500" />,
  info:     <Info className="w-4 h-4 text-slate-400" />,
};

const bgMap: Record<AppNotification['type'], string> = {
  critical: 'bg-red-50 border-red-100',
  admitted: 'bg-blue-50 border-blue-100',
  status:   'bg-amber-50 border-amber-100',
  info:     'bg-slate-50 border-slate-100',
};

const formatTime = (ts: number) => {
  const diff = Date.now() - ts;
  if (diff < 60_000) return 'just now';
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return new Date(ts).toLocaleDateString();
};

const NotificationPanel: React.FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector(s => s.notifications);
  const panelRef = useRef<HTMLDivElement>(null);
  const unread = list.filter(n => !n.read).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const timer = setTimeout(() => document.addEventListener('mousedown', handler), 100);
    return () => { clearTimeout(timer); document.removeEventListener('mousedown', handler); };
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50"
      style={{ animation: 'slideDown 0.15s ease-out' }}
    >
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-800">Notifications</span>
          {unread > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {unread}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {unread > 0 && (
            <button
              onClick={() => dispatch(markAllRead())}
              title="Mark all read"
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <CheckCheck className="w-3.5 h-3.5" />
            </button>
          )}
          {list.length > 0 && (
            <button
              onClick={() => dispatch(clearAll())}
              title="Clear all"
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="max-h-96 overflow-y-auto divide-y divide-slate-50">
        {list.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-slate-400 gap-2">
            <BellOff className="w-8 h-8 opacity-30" />
            <p className="text-sm">No notifications yet</p>
          </div>
        ) : (
          list.map(notif => (
            <div
              key={notif.id}
              onClick={() => dispatch(markRead(notif.id))}
              className={`flex gap-3 px-4 py-3 cursor-pointer transition-colors hover:brightness-95 border-l-2 ${
                notif.read ? 'bg-white border-transparent' : `${bgMap[notif.type]} border-l-current`
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {iconMap[notif.type]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-xs font-semibold truncate ${notif.read ? 'text-slate-600' : 'text-slate-800'}`}>
                    {notif.title}
                  </p>
                  {!notif.read && (
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0 mt-1" />
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{notif.body}</p>
                <p className="text-[10px] text-slate-400 mt-1">{formatTime(notif.timestamp)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;