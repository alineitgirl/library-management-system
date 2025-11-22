import { Client as workflowClient}  from "@upstash/workflow";
import config from "@/lib/config";

export const client = new workflowClient({
    baseUrl: config.env.upstash.qstashUrl,
    token: config.env.upstash.qstashToken
});