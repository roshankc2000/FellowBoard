import Resource from '../models/resource.js';
import fs from 'fs';
import path from 'path';

export const createResource = async (req, res) => {
  try {
    const { title, description, team_id, fellowship_id } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'File is required' });
    }

    if (!title || !description || !team_id || !fellowship_id) {
      return res.status(400).json({ error: 'Title, description, team_id, and fellowship_id are required' });
    }

    const newResource = await Resource.create({
      title,
      description,
      filename: file.originalname,
      filepath: file.path,
      mimetype: file.mimetype,
      team_id,
      fellowship_id,
    });

    return res.status(201).json({
      message: 'Resource created successfully',
      resource: newResource,
    });
  } catch (error) {
    console.error('Error creating resource:', error);
    return res.status(500).json({ error: 'Failed to create resource' });
  }
};

export const getResources = async (req, res) => {
  try {
    const { team_id } = req.query; // Get team_id from query parameters

    if (!team_id) {
      return res.status(400).json({ error: 'team_id is required' });
    }

    const resources = await Resource.findAll({
      where: { team_id },
    });

    if (resources.length === 0) {
      return res.status(404).json({ message: 'No resources found for this team' });
    }

    return res.status(200).json({ resources });
  } catch (error) {
    console.error('Error fetching resources:', error);
    return res.status(500).json({ error: 'Failed to fetch resources' });
  }
};
