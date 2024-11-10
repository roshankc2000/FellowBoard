import User from '../models/user.js';
import Fellowship from '../models/fellowship.js';
import Team from '../models/team.js';

export const createTeam = async (req, res) => {
  try {
    const { name, fellowship_id } = req.body;

    const user = await User.findByPk(req.user.id);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is an organizer
    if (user.role !== 'organizer') {
      return res.status(403).json({ message: 'Only organizers can create teams' });
    }

    // Ensure the fellowship exists before creating the team
    const fellowship = await Fellowship.findByPk(fellowship_id);
    if (!fellowship) {
      return res.status(400).json({ message: 'Fellowship not found' });
    }

    // Ensure the user is part of the fellowship
    if (user.fellowship_id != fellowship_id) {
      return res.status(403).json({ message: 'You are not part of this fellowship' });
    }

    // Create the team
    const team = await Team.create({ name, fellowship_id });

    res.status(201).json({
      id: team.id,
      name: team.name,
      team_code: team.team_code,
      fellowship_id: team.fellowship_id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message || error });
  }
};

export const joinTeam = async (req, res) => {
  try {
    const { team_code } = req.body;
    const userId = req.user.id; 

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure the user is not already in a team
    if (user.team_id) {
      return res.status(400).json({ message: 'User is already in a team' });
    }

    // Find the team by team_code
    const team = await Team.findOne({ where: { team_code } });
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Ensure the user is part of the same fellowship as the team
    const fellowship = await Fellowship.findByPk(team.fellowship_id);
    if (!fellowship) {
      return res.status(404).json({ message: 'Fellowship not found' });
    }
    // Ensure the user is a member of the fellowships
    if (user.fellowship_id !== fellowship.id) {
      return res.status(403).json({ message: 'User must be part of the fellowship to join this team' });
    }

    // Assign the user to the team
    user.team_id = team.id;
    await user.save(); 

    res.status(200).json({ message: 'User successfully joined the team', team });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message || error });
  }
};
