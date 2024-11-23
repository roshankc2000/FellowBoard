import Announcement from '../models/announcement.js';

export const createAnnouncement = async (req, res) => {
  try {
    const { title, content, team_id } = req.body;
    const fellowship_id = req.user.fellowship_id;  

    const announcement = await Announcement.create({
      title,
      content,
      fellowship_id,
      team_id: team_id || null  
    });

    res.status(201).json(announcement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating announcement', error: error.message });
  }
};

export const getAnnouncements = async (req, res) => {
  try {
    const fellowship_id = req.user.fellowship_id;
    const { team_id } = req.query;  // Optionally filter by team_id

    const condition = { fellowship_id };
    if (team_id) condition.team_id = team_id;

    const announcements = await Announcement.findAll({ where: condition });
    res.status(200).json(announcements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching announcements', error: error.message });
  }
};

export const getAnnouncement = async (req, res) => {
  try {
    const { announcementId } = req.params;
    const fellowship_id = req.user.fellowship_id;

    const announcement = await Announcement.findOne({
      where: { id: announcementId, fellowship_id }
    });

    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.status(200).json(announcement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching announcement', error: error.message });
  }
};

export const updateAnnouncement = async (req, res) => {
  try {
    const { announcementId } = req.params;
    const { title, content, team_id } = req.body;

    const announcement = await Announcement.findByPk(announcementId);
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    announcement.title = title;
    announcement.content = content;
    announcement.team_id = team_id || null;

    await announcement.save();
    res.status(200).json(announcement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating announcement', error: error.message });
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    const { announcementId } = req.params;

    const announcement = await Announcement.findByPk(announcementId);
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    await announcement.destroy();
    res.status(200).json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting announcement', error: error.message });
  }
};