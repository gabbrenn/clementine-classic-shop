import { Request, Response } from 'express';

export const healthController = {
  check: async (req: Request, res: Response) => {
    res.json({
      success: true,
      message: 'Server is running',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  },
};
