import { makeDataFn } from '../../lib/datafn';

export default makeDataFn(
    {
        queryParameters: {
            earliest: '-10m',
            latest: 'now',
        },
        query: `index=main 
        | stats sum(data.activity.video.total_contribution_amount) as contrib by data.activity.video.video_url 
        | sort -contrib 
        | rename data.activity.video.video_url as video 
        | table video 
        | append 
            [ search index=main earliest=-4h 
            | stats sum(data.activity.video.total_contribution_amount) as contrib by data.activity.video.video_url 
            | sort -contrib 
            | rename data.activity.video.video_url as video 
            | table video] 
        | head 1`,
        refresh: 30,
    },
    'ethereum-basics',
    'r95628j6s8n6'
);
