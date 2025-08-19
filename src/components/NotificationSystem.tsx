import { useState, useEffect } from "react";
import { Bell, X, Calendar, Droplets, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";

interface Notification {
  id: string;
  type: "routine" | "diet" | "progress" | "tip";
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

const NotificationSystem = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      // Generate sample notifications based on user's skincare journey
      const sampleNotifications: Notification[] = [
        {
          id: "1",
          type: "routine",
          title: "Time for your evening routine!",
          message: "Don't forget your evening skincare routine. Consistency is key to healthy skin.",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          isRead: false
        },
        {
          id: "2",
          type: "diet",
          title: "Hydration reminder",
          message: "Have you had enough water today? Aim for 8 glasses for healthy, glowing skin.",
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
          isRead: false
        },
        {
          id: "3",
          type: "tip",
          title: "Weekly skin tip",
          message: "Change your pillowcase! Clean pillowcases prevent bacteria buildup that can cause breakouts.",
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
          isRead: true
        },
        {
          id: "4",
          type: "progress",
          title: "Check your progress",
          message: "It's been 2 weeks since you started your routine. How is your skin feeling?",
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
          isRead: true
        }
      ];

      setNotifications(sampleNotifications);
      setUnreadCount(sampleNotifications.filter(n => !n.isRead).length);
    }
  }, [user]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "routine":
        return <Sparkles className="w-4 h-4 text-primary" />;
      case "diet":
        return <Droplets className="w-4 h-4 text-blue-500" />;
      case "progress":
        return <Calendar className="w-4 h-4 text-green-500" />;
      default:
        return <Bell className="w-4 h-4 text-orange-500" />;
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  if (!user) {
    return null;
  }

  return (
    <>
      {/* Notification Bell */}
      <Button
        variant="ghost"
        size="sm"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/20" 
            onClick={() => setIsOpen(false)}
          />
          <Card className="absolute top-16 right-4 w-80 max-h-96 shadow-strong overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Notifications</CardTitle>
                <div className="flex items-center space-x-2">
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-xs"
                    >
                      Mark all read
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No notifications yet</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                          !notification.isRead ? 'bg-primary/5' : ''
                        }`}
                        onClick={() => {
                          if (!notification.isRead) {
                            markAsRead(notification.id);
                          }
                        }}
                      >
                        <div className="flex items-start space-x-2">
                          <div className="mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm font-medium truncate">
                                {notification.title}
                              </p>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-primary rounded-full ml-2 flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {notification.timestamp.toLocaleDateString()} at{" "}
                              {notification.timestamp.toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default NotificationSystem;