import { createClient } from "@supabase/supabase-js";

const url = "https://xqpyssxbafawvbucrlcf.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxcHlzc3hiYWZhd3ZidWNybGNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwNTkyMzAsImV4cCI6MjA3NzYzNTIzMH0.UiyLe28aaCBAeiT3Z4GWHT7t2SDg1akZXXiexr99-8E"

const supabase = createClient(url, key);

export default function uploadFile(file){
    return new Promise(
        (resolve, reject)=>{
            const timeStamp = Date.now();
            const fileName = timeStamp + "_" + file.name;
            supabase.storage.from("images").upload(fileName, file, {
            cacheControl: "3600",
            upsert: false
        }).then(
            ()=>{
                const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
                resolve(publicUrl);
            }
        ).catch(
            ()=>{
                reject(error);
            })
        }
    );
}
