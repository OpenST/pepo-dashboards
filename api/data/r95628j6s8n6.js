import { makeDataFn } from '../../lib/datafn';

// NOTE: Change the tags everytime event changes
export default makeDataFn(
    {
        queryParameters: {
            earliest: '-10m',
            latest: 'now',
        },
        query: `index=main 
        | rename data.activity.video.tags{} AS tagvalue|eval tagValueLower=lower(tagvalue)
        | where (tagValueLower LIKE "ethcc") or (tagValueLower LIKE "paris") or (tagValueLower LIKE "bageth") or (tagValueLower LIKE "franceblockchainweek") 
        | stats sum(data.activity.video.total_contribution_amount) as contrib by data.activity.video.video_url
        | sort -contrib 
        | rename data.activity.video.video_url as video 
        | table video 
        | append 
            [ search index=main earliest=-1d
            | rename data.activity.video.tags{} AS tagvalue|eval tagValueLower=lower(tagvalue) 
            | where (tagValueLower LIKE "ethcc") or (tagValueLower LIKE "paris") or (tagValueLower LIKE "bageth") or (tagValueLower LIKE "franceblockchainweek")
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
