import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RecruiterNotesPanel = ({ notes, onAddNote, onUpdateNote }) => {
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote({
        id: Date.now(),
        content: newNote,
        author: 'Sarah Chen',
        timestamp: new Date(),
        type: 'note'
      });
      setNewNote('');
      setIsAddingNote(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getNoteIcon = (type) => {
    switch (type) {
      case 'interview': return 'Calendar';
      case 'feedback': return 'MessageSquare';
      case 'decision': return 'CheckCircle';
      default: return 'FileText';
    }
  };

  const getNoteColor = (type) => {
    switch (type) {
      case 'interview': return 'text-primary';
      case 'feedback': return 'text-warning';
      case 'decision': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Note */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Team Notes</h3>
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            onClick={() => setIsAddingNote(!isAddingNote)}
          >
            Add Note
          </Button>
        </div>

        {isAddingNote && (
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Add your note or feedback..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="w-full"
            />
            <div className="flex items-center space-x-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleAddNote}
                disabled={!newNote.trim()}
              >
                Save Note
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsAddingNote(false);
                  setNewNote('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Notes Timeline */}
      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-full bg-muted ${getNoteColor(note.type)}`}>
                <Icon name={getNoteIcon(note.type)} size={14} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground">{note.author}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(note.timestamp)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" className="p-1 h-auto">
                      <Icon name="Edit2" size={12} />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-1 h-auto">
                      <Icon name="Trash2" size={12} />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{note.content}</p>
                
                {note.tags && note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {note.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">Quick Actions</h4>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Calendar"
            iconPosition="left"
          >
            Schedule Interview
          </Button>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Mail"
            iconPosition="left"
          >
            Send Email
          </Button>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Phone"
            iconPosition="left"
          >
            Schedule Call
          </Button>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Share"
            iconPosition="left"
          >
            Share Profile
          </Button>
        </div>
      </div>

      {/* Team Activity */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">Recent Activity</h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-muted-foreground">Profile viewed by Mike Johnson</span>
            <span className="text-xs text-muted-foreground">2h ago</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-muted-foreground">Note added by Sarah Chen</span>
            <span className="text-xs text-muted-foreground">4h ago</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-warning rounded-full"></div>
            <span className="text-muted-foreground">Status updated to "Under Review"</span>
            <span className="text-xs text-muted-foreground">1d ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterNotesPanel;