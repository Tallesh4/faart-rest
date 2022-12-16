export default  {
	getString:function(meta: number, real: number){
		return `${Math.round((real / meta)*100) || 0}%`;
	},
	getInt:function(meta: number, real: number){
		return Math.round((real / meta)*100) || 0;
	}
};