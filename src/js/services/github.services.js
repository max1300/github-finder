import {User} from '../models/User'

const tokenGithub = 'a95dc5fab6aace11049dece1de2977021b91e54a';
var myHeaders = new Headers();
myHeaders.append("Authorization", `token ${tokenGithub}`);

export async function getUsers(search) {
    const url = `https://api.github.com/search/users?q=${search}+in:login+in:fullname&type=Users&page=1&per_page=20&sort=score`;
    
    try {
        const response = await fetch(url, { headers: myHeaders})
        const result = await response.json();
         
        
        if (result.message) {
            throw new Error(result.message);
        }

       
        
        
        return result.items.map(item => {
            return new User(
                item.login,
                item.avatar_url,
                item.type,
                item.repos_url.length
            );
        });

    } catch (e) {
        console.log('API Fetch error', e)
        throw e;

    };
}