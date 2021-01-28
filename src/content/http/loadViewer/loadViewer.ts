///Hackathon Dev Key: f71871d6-8d74-4bb7-a7b2-08a6170c2c7d
const baseKey = "f71871d6-8d74-4bb7-a7b2-08a6170c2c7d";
const basePath = "/api/map/js?key=";
const baseLocalUrl = `http://localhost:5000${basePath}`;
const baseDevUrl = `https://dev.app.aerialsphere.com${basePath}`;
const baseQAUrl = `https://qa.app.aerialsphere.com${basePath}`;
const baseProdUrl = `https://prod.app.aerialsphere.com${basePath}`;

export type ViewerENV = 'prod' | 'qa' | 'dev' | 'local';
const getENVPath = (env:ViewerENV) => {
	switch(env){
		case 'prod': return baseProdUrl;
		case 'qa': return baseQAUrl;
		case 'dev': return baseDevUrl;
		case 'local': return baseLocalUrl;
	}
}

export const loadViewer = (callback: () => void, useDev?:boolean, key:string = baseKey, env:ViewerENV = 'local') => {
	const script = document.createElement('script');
	script.src = `${getENVPath(env)}${key}`;
	script.id = 'as-script';
	document.body.appendChild(script);
	script.onload = () => { 
	if (callback) callback();
	};
}
  export default loadViewer;	